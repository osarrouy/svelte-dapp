<style>
  .lds-facebook {
    display: inline-block;
    position: relative;
    width: 16px;
    height: 8px;
  }
  .lds-facebook div {
    display: inline-block;
    position: absolute;
    left: 0px;
    width: 4px;
    background: #fff;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  .lds-facebook div:nth-child(1) {
    left: 0px;
    animation-delay: -0.24s;
  }
  .lds-facebook div:nth-child(2) {
    left: 6px;
    animation-delay: -0.12s;
  }
  .lds-facebook div:nth-child(3) {
    left: 12px;
    animation-delay: 0;
  }
  @keyframes lds-facebook {
    0% {
      top: 0px;
      height: 8px;
    }
    50%,
    100% {
      top: 4px;
      height: 4px;
    }
  }
</style>

<div class="lds-facebook">
  <div />
  <div />
  <div />
</div>
