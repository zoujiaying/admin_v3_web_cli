<template>
  <div class="error-container">
    <div class="error-content">
      <el-row :gutter="20">
        <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
          <div class="pic-error">403</div>
        </el-col>

        <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
          <div class="bullshit">
            <div class="bullshit-oops">
              {{ oops }}
            </div>
            <div class="bullshit-headline">
              {{ headline }}
            </div>
            <div class="bullshit-info">
              {{ info }}
            </div>
            <router-link class="bullshit-return-home" to="/">
              {{ btn }}
            </router-link>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoPower',
  data() {
    return {
      jumpTime: 5,
      oops: '抱歉!',
      headline: '您没有操作权限...',
      info: '当前帐号没有操作权限,请联系管理员。',
      btn: '返回',
      timer: 0,
    }
  },
}
</script>

<style lang="scss" scoped>
.error-container {
  position: relative;
  min-height: 100vh;

  .error-content {
    position: absolute;
    top: 55%;
    left: 50%;
    width: 40vw;
    height: 400px;
    transform: translate(-50%, -50%);

    .pic-error {
      position: relative;
      float: left;
      width: 100%;
      overflow: hidden;

      &-parent {
        width: 100%;
      }

      &-child {
        @keyframes cloudLeft {
          0% {
            top: 17px;
            left: 220px;
            opacity: 0;
          }

          20% {
            top: 33px;
            left: 188px;
            opacity: 1;
          }

          80% {
            top: 81px;
            left: 92px;
            opacity: 1;
          }

          100% {
            top: 97px;
            left: 60px;
            opacity: 0;
          }
        }

        position: absolute;

        &.left {
          top: 17px;
          left: 220px;
          width: 80px;
          opacity: 0;
          animation-delay: 1s;
          animation-duration: 2s;
          animation-name: cloudLeft;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
      }
    }

    .bullshit {
      @keyframes slideUp {
        0% {
          opacity: 0;
          transform: translateY(60px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      position: relative;
      float: left;
      width: 300px;
      padding: 30px 0;
      overflow: hidden;

      &-oops {
        margin-bottom: 20px;
        font-size: 32px;
        font-weight: bold;
        line-height: 40px;
        color: #1890ff;
        opacity: 0;
        animation-duration: 0.5s;
        animation-name: slideUp;
        animation-fill-mode: forwards;
      }

      &-headline {
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
        line-height: 24px;
        color: #222;
        opacity: 0;
        animation-delay: 0.1s;
        animation-duration: 0.5s;
        animation-name: slideUp;
        animation-fill-mode: forwards;
      }

      &-info {
        margin-bottom: 30px;
        font-size: 13px;
        line-height: 21px;
        color: rgb(0 0 0 / 65%);
        opacity: 0;
        animation-delay: 0.2s;
        animation-duration: 0.5s;
        animation-name: slideUp;
        animation-fill-mode: forwards;
      }

      &-return-home {
        display: block;
        float: left;
        width: 110px;
        height: 36px;
        font-size: 14px;
        line-height: 36px;
        color: #fff;
        text-align: center;
        cursor: pointer;
        background: #1890ff;
        border-radius: 100px;
        opacity: 0;
        animation-delay: 0.3s;
        animation-duration: 0.5s;
        animation-name: slideUp;
        animation-fill-mode: forwards;
      }
    }
  }
}
</style>
