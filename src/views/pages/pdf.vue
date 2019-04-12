<template>
<div class="pdfPage" v-loading="loading">
  <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas>
  <!-- <iframe name="myframe" :src="pdfSrc" width="100%" height="100%"></iframe> -->
</div>
</template>
<script>
import PDFJS from 'pdfjs-dist'
export default {
  data() {
    return {
      loading: true,
      pdfSrc: "",
      pages: null,
      pdfDoc: null
    };
  },
  mounted() {
    let file = this.$route.query.file;
    // let _host = window.location.host;
    // let _protocol = window.location.protocol;
    let pdfUrl = `/api/node/research/fileDownload?file=${file}`;
    this._loadFile(pdfUrl)
  },
  methods: {
    _renderPage (num) {
     this.pdfDoc.getPage(num).then((page) => {
       let canvas = document.getElementById('the-canvas' + num)
      let ctx = canvas.getContext('2d')
       let dpr = window.devicePixelRatio || 1
       let bsr = ctx.webkitBackingStorePixelRatio ||
         ctx.mozBackingStorePixelRatio ||
         ctx.msBackingStorePixelRatio ||
         ctx.oBackingStorePixelRatio ||
         ctx.backingStorePixelRatio || 1
       let ratio = dpr / bsr
       let viewport = page.getViewport(screen.availWidth / page.getViewport(1).width)
       canvas.width = viewport.width * ratio
       canvas.height = viewport.height * ratio
       canvas.style.width = viewport.width + 'px'
       canvas.style.height = viewport.height + 'px'
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
       let renderContext = {
         canvasContext: ctx,
         viewport: viewport
       }
       page.render(renderContext)
       if (this.pages > num) {
         this._renderPage(num + 1)
       }
     })
   },
   _loadFile (url) {
     PDFJS.getDocument(url).then((pdf) => {
       this.pdfDoc = pdf
       this.pages = this.pdfDoc.numPages
       this.$nextTick(() => {
         this.loading = false;
         this._renderPage(1)
       })
     })
   }
  }
};
</script>

<style lang="less">
.pdfPage {
  width: 100%;
  height: 100%;
}
</style>
