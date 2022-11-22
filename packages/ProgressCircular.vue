<template>
  <svg class="rotator-container" height="16" width="16">
    <circle class="rotator" cx="8" cy="8" r="6" stroke-width="2" fill="transparent" />
  </svg>
</template>
<script name="ProcessCircular" setup lang="ts" />
<style scoped>
.rotator-container {
  animation: rotate-1-turn 1.4s linear infinite;
}

.rotator {
  stroke: var(--er-primary-dark);
  stroke-linecap: round;
  animation: loading 1.4s ease-in-out infinite;
}

@keyframes loading {
  0% {
    stroke-dasharray: 1, 60;
  }

  50% {
    stroke-dasharray: 40, 60;
    stroke-dashoffset: -5;
  }

  100% {
    stroke-dasharray: 40, 60;
    stroke-dashoffset: -43;
  }
}

@keyframes rotate-1-turn {
  100% {
    transform: rotate(1turn);
  }
}
</style>
