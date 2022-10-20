<template>
  <NotesComponent :title="title" :text="text" :time="time" />
</template>

<script>
import NotesComponent from "@/components/NotesComponent.vue";
export default {
  name: "ReadingTimeItemView",
  data() {
    return {
      title: null,
      text: null,
      time: null
    };
  },
  components: { NotesComponent },
  mounted() {
    this.title = this.$route.params.title;
    this.text = this.$route.params.text;
    this.time = this.$route.params.time;
  }
};
</script>