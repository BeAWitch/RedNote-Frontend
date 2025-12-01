<template>
  <div class="avatar-container">
    <!-- 头像显示区域 -->
    <label class="avatar-wrapper">
      <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
      <div v-else class="avatar placeholder">
        点击上传
      </div>

      <!-- 文件选择 -->
      <input
        type="file"
        accept="image/*"
        style="display:none"
        @change="handleFileChange"
      />
    </label>
  </div>
</template>

<script setup>
import { ref } from "vue";

const avatarUrl = ref("");      // 用于显示的头像 URL
const avatarFile = ref(null);   // 原始文件对象（提交给后端）

// 文件选择处理
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // 保存原始文件（用于后端上传）
  avatarFile.value = file;

  // 本地预览
  const reader = new FileReader();
  reader.onload = (event) => {
    avatarUrl.value = event.target.result;
  };
  reader.readAsDataURL(file);
};

// 组件外可访问 avatarFile 用于后端上传
defineExpose({
  avatarFile,
  avatarUrl
});
</script>

<style scoped>
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-wrapper {
  width: 10.9667rem;
  height: 10.9667rem;
  border-radius: 50%;
  overflow: hidden;
  display: block;
  cursor: pointer;
  border: 2px dashed #dcdfe6;
  position: relative;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  width: 100%;
  height: 100%;
  color: #909399;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
