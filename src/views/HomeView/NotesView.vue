<template>
  <NotesComponent :title="title" :text="text" :time="time" />
</template>

<script>
import NotesComponent from "@/components/NotesComponent.vue";
export default {
  name: "NotesView",
  data() {
    return {
      title: null,
      text: null,
      time: null,
      num: null
    };
  },
  components: { NotesComponent },
  mounted() {
    // this.$nextTick(() => {
    this.num = Math.floor(Math.random() * 4) + 6;

    this.$axios
      .get(
        `/api/shengcai/api/mobile/common/findReportListById?rid=13546${this.num}&userid=153225&meetid=1339`
      )
      .then(({ data }) => {
        this.title = data.report.title;
        this.text = data.report.text;
        this.time = data.report.createTime;
      });
    // });
  }
};
</script>