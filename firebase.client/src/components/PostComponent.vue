<template>
  <div class="card" v-if="postProp.creator">
    <img class="card-img-top img-fluid" :src="postProp.imgUrl" alt="">
    <div class="card-body">
      <p class="card-text">
        {{ postProp.body }} || {{ postProp.creator.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostComponent',
  props: { postProp: { type: Object, required: true } },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
