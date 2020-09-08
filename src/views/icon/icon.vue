<template>
    <div class="icons">
        <yd-icon @click="handleEvent('addteam')" icon-class="addteam" class="icon" />
        <yd-icon @click="handleEvent('adduser')" icon-class="adduser" class="icon" />
        <yd-icon @click="handleEvent('appstore')" icon-class="appstore" class="icon" />
        <yd-icon @click="handleEvent('areachart')" icon-class="areachart" class="icon" />
        <yd-icon @click="handleEvent('arrowdown')" icon-class="arrowdown" class="icon" />
        <yd-icon @click="handleEvent('arrowleft')" icon-class="arrowleft" class="icon" />
        <yd-icon @click="handleEvent('arrowright')" icon-class="arrowright" class="icon" />
        <yd-icon @click="handleEvent('arrowup')" icon-class="arrowup" class="icon" />
        <yd-icon @click="handleEvent('barchart')" icon-class="barchart" class="icon" />
        <yd-icon @click="handleEvent('bell')" icon-class="bell" class="icon" />
        <yd-icon @click="handleEvent('bug')" icon-class="bug" class="icon" />
        <yd-icon @click="handleEvent('camera')" icon-class="camera" class="icon" />
        <yd-icon @click="handleEvent('car')" icon-class="car" class="icon" />
        <yd-icon @click="handleEvent('check')" icon-class="check" class="icon" />
        <yd-icon @click="handleEvent('clear')" icon-class="clear" class="icon" />
        <yd-icon @click="handleEvent('close')" icon-class="close" class="icon" />
        <yd-icon @click="handleEvent('cloud')" icon-class="cloud" class="icon" />
        <yd-icon @click="handleEvent('deleteteam')" icon-class="deleteteam" class="icon" />
        <yd-icon @click="handleEvent('deleteuser')" icon-class="deleteuser" class="icon" />
        <yd-icon @click="handleEvent('desktop')" icon-class="desktop" class="icon" />
        <yd-icon @click="handleEvent('doubleleft')" icon-class="doubleleft" class="icon" />
        <yd-icon @click="handleEvent('doubleright')" icon-class="doubleright" class="icon" />
        <yd-icon @click="handleEvent('down')" icon-class="down" class="icon" />
        <yd-icon @click="handleEvent('download')" icon-class="download" class="icon" />
        <yd-icon @click="handleEvent('drag')" icon-class="drag" class="icon" />
        <yd-icon @click="handleEvent('editsquare')" icon-class="editsquare" class="icon" />
        <yd-icon @click="handleEvent('error')" icon-class="error" class="icon" />
        <yd-icon @click="handleEvent('export')" icon-class="export" class="icon" />
        <yd-icon @click="handleEvent('eye')" icon-class="eye" class="icon" />
        <yd-icon @click="handleEvent('eyeclose')" icon-class="eyeclose" class="icon" />
        <yd-icon @click="handleEvent('eyeclosefill')" icon-class="eyeclosefill" class="icon" />
        <yd-icon @click="handleEvent('fire')" icon-class="fire" class="icon" />
        <yd-icon @click="handleEvent('frown')" icon-class="frown" class="icon" />
        <yd-icon @click="handleEvent('fullscreen')" icon-class="fullscreen" class="icon" />
        <yd-icon @click="handleEvent('fullscreenexit')" icon-class="fullscreenexit" class="icon" />
        <yd-icon @click="handleEvent('fund')" icon-class="fund" class="icon" />
        <yd-icon @click="handleEvent('gift')" icon-class="gift" class="icon" />
        <yd-icon @click="handleEvent('heart')" icon-class="heart" class="icon" />
        <yd-icon @click="handleEvent('home')" icon-class="home" class="icon" />
        <yd-icon @click="handleEvent('idcard')" icon-class="idcard" class="icon" />
        <yd-icon @click="handleEvent('image')" icon-class="image" class="icon" />
        <yd-icon @click="handleEvent('left')" icon-class="left" class="icon" />
        <yd-icon @click="handleEvent('like')" icon-class="like" class="icon" />
        <yd-icon @click="handleEvent('linechart')" icon-class="linechart" class="icon" />
        <yd-icon @click="handleEvent('location')" icon-class="location" class="icon" />
        <yd-icon @click="handleEvent('logout')" icon-class="logout" class="icon" />
        <yd-icon @click="handleEvent('mail')" icon-class="mail" class="icon" />
        <yd-icon @click="handleEvent('man')" icon-class="man" class="icon" />
        <yd-icon @click="handleEvent('notification')" icon-class="notification" class="icon" />
        <yd-icon @click="handleEvent('phone')" icon-class="phone" class="icon" />
        <yd-icon @click="handleEvent('plus')" icon-class="plus" class="icon" />
        <yd-icon @click="handleEvent('pointmap')" icon-class="pointmap" class="icon" />
        <yd-icon @click="handleEvent('poweroff')" icon-class="poweroff" class="icon" />
        <yd-icon @click="handleEvent('read')" icon-class="read" class="icon" />
        <yd-icon @click="handleEvent('redo')" icon-class="redo" class="icon" />
        <yd-icon @click="handleEvent('reload')" icon-class="reload" class="icon" />
        <yd-icon @click="handleEvent('right')" icon-class="right" class="icon" />
        <yd-icon @click="handleEvent('scan')" icon-class="scan" class="icon" />
        <yd-icon @click="handleEvent('skin')" icon-class="skin" class="icon" />
        <yd-icon @click="handleEvent('smile')" icon-class="smile" class="icon" />
        <yd-icon @click="handleEvent('sound')" icon-class="sound" class="icon" />
        <yd-icon @click="handleEvent('star')" icon-class="star" class="icon" />
        <yd-icon @click="handleEvent('stop')" icon-class="stop" class="icon" />
        <yd-icon @click="handleEvent('swap')" icon-class="swap" class="icon" />
        <yd-icon @click="handleEvent('table')" icon-class="table" class="icon" />
        <yd-icon @click="handleEvent('team')" icon-class="team" class="icon" />
        <yd-icon @click="handleEvent('thunderbolt')" icon-class="thunderbolt" class="icon" />
        <yd-icon @click="handleEvent('totop')" icon-class="totop" class="icon" />
        <yd-icon @click="handleEvent('undo')" icon-class="undo" class="icon" />
        <yd-icon @click="handleEvent('unlike')" icon-class="unlike" class="icon" />
        <yd-icon @click="handleEvent('up')" icon-class="up" class="icon" />
        <yd-icon @click="handleEvent('upload')" icon-class="upload" class="icon" />
        <yd-icon @click="handleEvent('user')" icon-class="user" class="icon" />
        <yd-icon @click="handleEvent('vertical-align-botto')" icon-class="vertical-align-botto" class="icon" />
        <yd-icon @click="handleEvent('vertical-align-top')" icon-class="vertical-align-top" class="icon" />
        <yd-icon @click="handleEvent('video')" icon-class="video" class="icon" />
        <yd-icon @click="handleEvent('wifi')" icon-class="wifi" class="icon" />
        <yd-icon @click="handleEvent('woman')" icon-class="woman" class="icon" />
    </div>
</template>

<script>
  export default {
    name: "icon",
    methods: {
      handleEvent(msg) {
        console.log(msg)
      }
    }
  }
</script>

<style scoped>
    .icons{
        display: flex;
        flex-wrap: wrap;
    }
    .icon{
        font-size: 40px;
        color: #909399;
        margin: 30px 40px;
        transition: 0.1s ease-in;
        cursor: pointer;
    }
    .icon:hover{
        transform: scale(1.2);
        color: #03A9F4;
    }
</style>
