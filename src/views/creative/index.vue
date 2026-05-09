<template>
  <div class="container" id="container">
    <div v-if="isLogin" class="push-container">
      <div class="header">
        <span class="header-icon"></span><span class="header-title">智能创作台</span>
      </div>

      <!-- 创作需求 -->
      <div class="creative-section">
        <div class="section-title">创作需求</div>
        <el-input
          v-model="requirement"
          maxlength="500"
          show-word-limit
          :autosize="{ minRows: 4, maxRows: 8 }"
          type="textarea"
          placeholder="请描述你的创作需求，比如：写一篇关于 Spring Boot 入门的笔记..."
          class="input-requirement"
        />
        <div class="optional-fields">
          <el-input v-model="category" placeholder="分类（可选）" size="small" />
          <el-input v-model="styleField" placeholder="风格/人设（可选）" size="small" />
          <el-input v-model="tone" placeholder="语气（可选）" size="small" />
        </div>
      </div>

      <el-divider style="margin: 0.75rem; width: 96%" />

      <!-- 参考资料 -->
      <div class="creative-section">
        <div class="section-title">参考资料</div>
        <div class="section-subtitle">上传 PDF 资料，AI 将基于资料内容进行创作（可选）</div>
        <el-upload
          ref="uploadRef"
          v-model:file-list="pdfFiles"
          :auto-upload="false"
          :limit="1"
          accept=".pdf"
          :on-change="handlePdfChange"
          :on-exceed="handlePdfExceed"
          drag
          class="pdf-upload"
        >
          <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
          <div class="el-upload__text">
            将 PDF 拖到此处或 <em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">仅支持 .pdf 文件，大小不超过 20MB</div>
          </template>
        </el-upload>
      </div>

      <el-divider style="margin: 0.75rem; width: 96%" />

      <!-- 生成大纲按钮 -->
      <div class="creative-section">
        <button class="generate-btn" :class="{ loading: outlineLoading }" :disabled="outlineLoading" @click="handleGenerateOutline">
          <span class="btn-content">🌟 生成大纲</span>
        </button>
      </div>

      <!-- 大纲展示 -->
      <template v-if="outlineData">
        <el-divider style="margin: 0.75rem; width: 96%" />
        <div class="creative-section">
          <div class="section-title">创作大纲</div>

          <!-- 备选标题 -->
          <div v-if="outlineData.outline.titleCandidates?.length" class="candidate-group">
            <div class="candidate-label">备选标题</div>
            <div class="candidate-tags">
              <el-tag
                v-for="title in outlineData.outline.titleCandidates"
                :key="title"
                :type="selectedTitle === title ? 'primary' : ''"
                class="candidate-tag clickable"
                @click="selectedTitle = title"
              >
                {{ title }}
              </el-tag>
            </div>
          </div>

          <!-- 建议标签 -->
          <div v-if="outlineData.outline.tagCandidates?.length" class="candidate-group">
            <div class="candidate-label">建议标签</div>
            <div class="candidate-tags">
              <el-tag
                v-for="tag in outlineData.outline.tagCandidates"
                :key="tag"
                :type="selectedTags.includes(tag) ? 'danger' : ''"
                class="candidate-tag clickable"
                @click="toggleTag(tag)"
              >
                {{ tag }}
              </el-tag>
            </div>
          </div>

          <!-- 引用来源 -->
          <div v-if="outlineData.sources?.length" class="candidate-group">
            <div class="candidate-label">引用来源</div>
            <div class="sources-list">
              <el-tag
                v-for="source in outlineData.sources"
                :key="source.id"
                type="info"
                size="small"
                class="source-tag"
              >
                [{{ source.id }}] {{ source.title }}
              </el-tag>
            </div>
          </div>

          <!-- 可编辑章节 -->
          <div class="sections-container">
            <div
              v-for="(section, si) in editableSections"
              :key="section.id"
              class="outline-section"
            >
              <div class="section-header">
                <span class="section-number">第{{ si + 1 }}部分</span>
                <div class="section-title-edit">
                  <el-input
                    v-if="section.editing"
                    v-model="section.title"
                    size="small"
                    class="inline-edit-input"
                    @blur="finishEdit(section)"
                    @keyup.enter="finishEdit(section)"
                  />
                  <span v-else class="section-title-text clickable" @click="startEdit(section)">
                    {{ section.title }}
                  </span>
                </div>
                <el-button type="danger" size="small" :icon="Delete" circle @click="removeSection(si)" class="delete-section-btn" />
              </div>

              <div class="points-list">
                <div
                  v-for="(point, pi) in section.points"
                  :key="point.id"
                  class="point-item"
                >
                  <span class="point-bullet">•</span>
                  <div class="point-content">
                    <el-input
                      v-if="point.editing"
                      v-model="point.text"
                      size="small"
                      class="inline-edit-input"
                      @blur="finishEdit(point)"
                      @keyup.enter="finishEdit(point)"
                    />
                    <span v-else class="point-text clickable" @click="startEdit(point)">
                      {{ point.text }}
                    </span>
                    <el-tag
                      v-for="cit in point.citations"
                      :key="cit"
                      size="small"
                      type="primary"
                      class="citation-badge"
                    >
                      {{ cit }}
                    </el-tag>
                  </div>
                  <el-button type="danger" size="small" :icon="Delete" circle @click="removePoint(section, pi)" class="delete-point-btn" />
                </div>
              </div>

              <el-button size="small" @click="addPoint(section)" class="add-point-btn">
                + 添加要点
              </el-button>
            </div>

            <el-button @click="addSection()" class="add-section-btn">
              + 添加章节
            </el-button>
          </div>
        </div>
      </template>

      <!-- 生成终稿 -->
      <template v-if="outlineData">
        <el-divider style="margin: 0.75rem; width: 96%" />
        <div class="creative-section">
          <el-input
            v-model="extraRequirement"
            placeholder="补充要求（可选）"
            class="extra-input"
          />
          <button class="generate-btn draft-btn" :class="{ loading: draftLoading }" :disabled="draftLoading" @click="handleGenerateDraft">
            <span class="btn-content">🌟 生成终稿</span>
          </button>
        </div>
      </template>

      <!-- 终稿展示 -->
      <template v-if="draftText">
        <el-divider style="margin: 0.75rem; width: 96%" />
        <div class="creative-section">
          <div class="section-title">创作终稿</div>
          <div class="draft-content">{{ draftText }}</div>
          <button class="copy-btn" @click="copyDraft">
            📋 复制正文
          </button>
        </div>
      </template>

      <el-divider style="margin: 0.75rem; width: 96%" />
      <div class="submit">
        <button class="clearBtn" @click="resetData">
          <span class="btn-content">取消</span>
        </button>
      </div>
    </div>
    <div v-else>
      <el-empty description="用户未登录" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from "vue";
import { UploadFilled, Delete } from "@element-plus/icons-vue";
import { ElMessage, type UploadUserFile } from "element-plus";
import { useUserStore } from "@/stores/userStore";
import { uploadBatchFiles } from "@/apis/oss";
import {
  createCreativeProject,
  uploadProjectDocs,
  generateOutline,
  generateDraft,
  type CreativeOutlineVO,
  type CreativeDraftVO,
} from "@/apis/ai";

const PDF_MAX_SIZE = 20 * 1024 * 1024;

interface EditablePoint {
  id: string;
  text: string;
  citations: string[];
  editing: boolean;
}

interface EditableSection {
  id: string;
  title: string;
  points: EditablePoint[];
  editing: boolean;
}

const userStore = useUserStore();
const isLogin = ref(userStore.isLogin());

const requirement = ref("");
const category = ref("");
const styleField = ref("");
const tone = ref("");
const pdfFiles = ref<UploadUserFile[]>([]);
const extraRequirement = ref("");

const projectId = ref("");
const outlineData = ref<CreativeOutlineVO | null>(null);
const editableSections = ref<EditableSection[]>([]);
const selectedTitle = ref("");
const selectedTags = ref<string[]>([]);
const draftText = ref("");

const outlineLoading = ref(false);
const draftLoading = ref(false);

let idCounter = 0;
const nextId = () => `${Date.now()}_${++idCounter}`;

const toggleTag = (tag: string) => {
  const idx = selectedTags.value.indexOf(tag);
  if (idx !== -1) {
    selectedTags.value.splice(idx, 1);
  } else {
    selectedTags.value.push(tag);
  }
};

const startEdit = (item: EditablePoint | EditableSection) => {
  item.editing = true;
};

const finishEdit = (item: EditablePoint | EditableSection) => {
  item.editing = false;
};

const removeSection = (index: number) => {
  editableSections.value.splice(index, 1);
};

const removePoint = (section: EditableSection, index: number) => {
  section.points.splice(index, 1);
};

const addSection = () => {
  editableSections.value.push({
    id: nextId(),
    title: "",
    editing: true,
    points: [],
  });
};

const addPoint = (section: EditableSection) => {
  section.points.push({
    id: nextId(),
    text: "",
    citations: [],
    editing: true,
  });
};

const handlePdfChange = (file: UploadUserFile) => {
  if (file.raw && file.raw.type !== "application/pdf") {
    ElMessage.warning("仅支持上传 PDF 文件");
    pdfFiles.value.pop();
    return;
  }
  if (file.size && file.size > PDF_MAX_SIZE) {
    ElMessage.error(`PDF 大小不能超过 ${PDF_MAX_SIZE / 1024 / 1024}MB`);
    pdfFiles.value.pop();
  }
};

const handlePdfExceed = () => {
  ElMessage.warning("最多只能上传 1 个 PDF 文件，请先移除已选文件");
};

const handleGenerateOutline = async () => {
  if (!requirement.value.trim()) {
    ElMessage.warning("请输入创作需求");
    return;
  }

  outlineLoading.value = true;
  try {
    const projectRes = await createCreativeProject();
    const pid = projectRes.data.projectId;
    projectId.value = pid;

    const pdfFile = pdfFiles.value[0];
    if (pdfFile?.raw) {
      let fileUrl: string | undefined;
      try {
        const formData = new FormData();
        formData.append("files", pdfFile.raw);
        const uploadRes = await uploadBatchFiles(formData);
        fileUrl = uploadRes.data?.[0];
      } catch (e) {
        if (Array.isArray(e) && e.length > 0) {
          fileUrl = e[0];
        } else {
          // 真正的错误处理
          console.error("PDF 上传 OSS 失败", e);
          ElMessage.warning("PDF 上传失败，将使用普通问答模式生成大纲");
        }
      }

      if (fileUrl) {
        try {
          const fileName = pdfFile.name || "document.pdf";
          await uploadProjectDocs(pid, {
            docs: [{ fileName, fileUrl }],
          });
        } catch (e) {
          console.error("PDF 资料入库失败", e);
        }
      }
    }

    const res = await generateOutline({
      projectId: pid,
      requirement: requirement.value.trim(),
      category: category.value || undefined,
      style: styleField.value || undefined,
      tone: tone.value || undefined,
    });

    outlineData.value = res.data;
    editableSections.value = (res.data.outline.sections || []).map((s, si) => ({
      id: `sec_${si}`,
      title: s.title,
      editing: false,
      points: (s.points || []).map((p, pi) => ({
        id: `pt_${si}_${pi}`,
        text: p.text,
        citations: p.citations || [],
        editing: false,
      })),
    }));

    selectedTitle.value = "";
    selectedTags.value = [];
    draftText.value = "";
    ElMessage.success("大纲生成成功！");
  } catch (e) {
    console.error("生成大纲失败", e);
    ElMessage.error("生成大纲失败，请稍后重试");
  } finally {
    outlineLoading.value = false;
  }
};

const handleGenerateDraft = async () => {
  if (!projectId.value || !outlineData.value?.outlineId) {
    ElMessage.warning("请先生成大纲");
    return;
  }

  draftLoading.value = true;
  try {
    const res = await generateDraft({
      projectId: projectId.value,
      outlineId: outlineData.value.outlineId,
      extraRequirement: extraRequirement.value || undefined,
    });

    draftText.value = res.data.draftText;
    ElMessage.success("终稿生成成功！");
  } catch (e) {
    console.error("生成终稿失败", e);
    ElMessage.error("生成终稿失败，请稍后重试");
  } finally {
    draftLoading.value = false;
  }
};

const copyDraft = async () => {
  try {
    await navigator.clipboard.writeText(draftText.value);
    ElMessage.success("已复制到剪贴板");
  } catch {
    ElMessage.error("复制失败，请手动复制");
  }
};

const resetData = () => {
  requirement.value = "";
  category.value = "";
  styleField.value = "";
  tone.value = "";
  pdfFiles.value = [];
  extraRequirement.value = "";
  projectId.value = "";
  outlineData.value = null;
  editableSections.value = [];
  selectedTitle.value = "";
  selectedTags.value = [];
  draftText.value = "";
  outlineLoading.value = false;
  draftLoading.value = false;
};
</script>

<style lang="less" scoped>
:deep(.el-upload__tip) {
  font-size: 12px;
  color: #999;
}

:deep(.el-upload-dragger) {
  padding: 20px;
}

a {
  text-decoration: none;
}

.container {
  flex: 1;
  padding-top: 72px;

  .push-container {
    margin-left: 11vw;
    margin-top: 1vw;
    width: 720px;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: var(--el-box-shadow-lighter);
    padding-bottom: 20px;

    .header {
      padding: 15px 20px;
      line-height: 16px;
      font-size: 16px;
      font-weight: 400;

      .header-icon {
        position: relative;
        top: 2px;
        display: inline-block;
        width: 6px;
        height: 16px;
        background: #3a64ff;
        border-radius: 3px;
        margin-right: 3px;
      }
    }

    .creative-section {
      padding: 6px 20px;

      .section-title {
        font-size: 14px;
        font-weight: 500;
        color: #303133;
        margin-bottom: 10px;
      }

      .section-subtitle {
        font-size: 12px;
        color: #909399;
        margin-bottom: 8px;
      }

      .input-requirement {
        margin-bottom: 12px;
        font-size: 14px;
      }

      .optional-fields {
        display: flex;
        gap: 10px;

        .el-input {
          flex: 1;
        }
      }

      .pdf-upload {
        width: 100%;
      }

      .candidate-group {
        margin-bottom: 14px;

        .candidate-label {
          font-size: 12px;
          color: #909399;
          margin-bottom: 6px;
        }

        .candidate-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;

          .candidate-tag.clickable {
            cursor: pointer;
            transition: transform 0.2s;

            &:hover {
              transform: scale(1.05);
            }
          }
        }

        .sources-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;

          .source-tag {
            font-size: 11px;
          }
        }
      }

      .sections-container {
        margin-top: 12px;

        .outline-section {
          background: #fafafa;
          border: 1px solid #eee;
          border-radius: 6px;
          padding: 12px 14px;
          margin-bottom: 10px;

          .section-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;

            .section-number {
              font-size: 13px;
              font-weight: 600;
              color: #3a64ff;
              white-space: nowrap;
            }

            .section-title-edit {
              flex: 1;

              .section-title-text {
                font-size: 14px;
                font-weight: 500;
                color: #303133;
              }

              .inline-edit-input {
                width: 100%;
              }
            }

            .delete-section-btn {
              flex-shrink: 0;
            }
          }

          .points-list {
            padding-left: 4px;

            .point-item {
              display: flex;
              align-items: flex-start;
              gap: 6px;
              margin-bottom: 6px;

              .point-bullet {
                color: #3a64ff;
                font-weight: 600;
                font-size: 16px;
                line-height: 24px;
              }

              .point-content {
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: 4px;

                .point-text {
                  font-size: 13px;
                  color: #484848;
                  line-height: 22px;
                }

                .inline-edit-input {
                  flex: 1;
                  min-width: 200px;
                }

                .citation-badge {
                  font-size: 10px;
                  height: 18px;
                  line-height: 18px;
                }
              }

              .delete-point-btn {
                flex-shrink: 0;
              }
            }
          }

          .add-point-btn {
            margin-top: 4px;
            font-size: 12px;
          }
        }

        .add-section-btn {
          width: 100%;
          font-size: 13px;
        }
      }

      .extra-input {
        margin-bottom: 10px;
      }

      .draft-content {
        background: #fafafa;
        border: 1px solid #e8e8e8;
        border-radius: 6px;
        padding: 16px;
        font-size: 14px;
        line-height: 24px;
        color: #303133;
        white-space: pre-wrap;
        min-height: 120px;
        margin-bottom: 10px;
      }

      .copy-btn {
        min-width: 100px;
        height: 32px;
        font-size: 13px;
        cursor: pointer;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        background-color: white;
        color: #383838;
        transition: all 0.2s;

        &:hover {
          border-color: #3a64ff;
          color: #3a64ff;
          transform: scale(1.02);
        }
      }
    }

    .clickable {
      cursor: pointer;
    }

    .generate-btn {
      min-width: 120px;
      height: 36px;
      font-size: 15px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: #3a64ff;
      color: #fff;
      border: none;
      border-radius: 20px;
      transition: all 0.3s;
      padding: 0 24px;

      &:hover:not(:disabled) {
        transform: scale(1.05);
        box-shadow: 0 2px 8px rgba(58, 100, 255, 0.3);
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .btn-content {
        display: inline-flex;
        align-items: center;
      }
    }

    .draft-btn {
      margin-top: 10px;
    }

    .submit {
      padding: 10px 20px;
      text-align: center;

      button {
        width: 100px;
        height: 36px;
        font-size: 15px;
        display: inline-block;
        margin: 0 10px;
        cursor: pointer;
        transition: all 0.3s;
      }

      button:hover {
        transform: scale(1.05);
      }

      .clearBtn {
        border-radius: 24px;
        background: #fff;
        border: 1px solid rgb(217, 217, 217);
        color: #383838;
      }
    }
  }
}
</style>
