<template>
    <div>
        <div>
            <h2>基本使用</h2>
            <div style="width: 150px;">
                <yd-select v-model="value">
                    <yd-select-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </yd-select-option>
                </yd-select>
            </div>
        </div>
        <div>
            <h2>自定义提示语、不要outline</h2>
            <yd-select v-model="value" placeholder="自定义提示语" :isOutline="false">
                <yd-select-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </yd-select-option>
            </yd-select>
        </div>
        <div>
            <h2>自定义样式</h2>
            <div style="width: 150px;">
                <yd-select v-model="value" :styles="{color: 'red'}">
                    <yd-select-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </yd-select-option>
                </yd-select>
            </div>
        </div>
        <div>
            <h2>相关事件</h2>
            <div style="width: 150px;">
                <yd-select v-model="value" @changeEmit="changeEmit" @focusEmit="focusEmit" @blurEmit="blurEmit">
                    <yd-select-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </yd-select-option>
                </yd-select>
            </div>
        </div>
        <div>
            <h2>多选</h2>
            <div style="width: 150px;">
                <yd-select v-model="value1" multiple>
                    <yd-select-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </yd-select-option>
                </yd-select>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "yselect",
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭1111北京烤鸭1111111111'
        }, {
          value: '选项6',
          label: '海底捞'
        }],
        value: '',
        value1: []
      }
    },
    methods: {
      changeEmit() {
        alert('改变事件')
      },
      focusEmit() {
        alert('打开事件')
      },
      blurEmit() {
        alert('关闭事件')
      }
    }
  }
</script>

<style scoped>

</style>
