<template>
    <div>
        <div>
            <h2>基本使用</h2>
            <yd-checkbox v-model="checked" @changeEmit="test">篮球</yd-checkbox>
        </div>
        <div>
            <h2>组合使用</h2>
            <yd-checkbox-group v-model="checkList1" @changeEmit="test" >
                <yd-checkbox label="篮球"></yd-checkbox>
                <yd-checkbox label="足球"></yd-checkbox>
                <yd-checkbox label="羽毛球"></yd-checkbox>
                <yd-checkbox label="游泳"></yd-checkbox>
            </yd-checkbox-group>
        </div>
        <div>
            <h2>单一禁止使用</h2>
            <yd-checkbox v-model="checked" disabled>篮球</yd-checkbox>
            <yd-checkbox disabled>足球</yd-checkbox>
        </div>
        <div>
            <h2>组合禁止使用</h2>
            <yd-checkbox-group v-model="checkList1" disabled>
                <yd-checkbox label="篮球"></yd-checkbox>
                <yd-checkbox label="足球"></yd-checkbox>
                <yd-checkbox label="羽毛球"></yd-checkbox>
                <yd-checkbox label="游泳"></yd-checkbox>
            </yd-checkbox-group>
        </div>
        <div>
            <h2>组合使用-使用对象数组格式-默认key为label</h2>
            <yd-checkbox-group v-model="checkList2" :isLabel="true"  @changeEmit="test" >
                <yd-checkbox v-for="(item, key) in labels" :key="key" :label="item"></yd-checkbox>
            </yd-checkbox-group>
        </div>
        <div>
            <h2>组合使用-使用对象数组格式-自定义key</h2>
            <yd-checkbox-group v-model="checkList3" :isLabel="true" label="name" @changeEmit="test" >
                <yd-checkbox v-for="(item, key) in labels" :key="key" :label="item"></yd-checkbox>
            </yd-checkbox-group>
        </div>
    </div>
</template>

<script>
  export default {
    name: "checkbox",
    data() {
      return {
        checked: true,
        checkList1: ['足球', '篮球'],
        checkList2: [{label: '足球', }, {label: '篮球', }],
        checkList3: [{name: '足球', }, {name: '篮球', }],
        labels: [
          {label: '足球', name: '足球'},
          {label: '篮球', name: '篮球'},
          {label: '排球', name: '排球'},
          {label: '游泳', name: '游泳'}
        ],
      }
    },
    mounted() {
      // setTimeout(() => {
      //   this.labels =
      // }, 5000)
    },
    methods: {
      test(a, b) {
        console.log(a, b)
      },
    }
  }
</script>

<style scoped>

</style>
