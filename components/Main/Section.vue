<script setup>
import { ref, useSSRContext, onMounted, useCssModule, computed } from "vue";
import { parse } from "node-html-parser";

const styles = useCssModule();

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const ssrContext = import.meta.server ? useSSRContext() : null;
const contentHtml = ref("");

const parseHTML = (html) => {
  if (import.meta.server) {
    return parse(html);
  } else {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
  }
};

const processHtmlContent = (htmlString) => {
  const doc = parseHTML(htmlString);

  const addClasses = (selector, styleClass) => {
    const elements = doc.querySelectorAll(selector);
    elements.forEach((el) => {
      if (import.meta.server) {
        const classAttr = el.getAttribute("class") || "";
        el.setAttribute("class", `${classAttr} ${styles[styleClass]}`);
      } else {
        el.classList.add(styles[styleClass]);
      }
    });
  };
  return import.meta.server ? doc.toString() : doc.body.innerHTML;
};

if (import.meta.server && props.data.type === "section") {
  const modifiedHtml = processHtmlContent(props.data.content);
  ssrContext.modifiedHtml = modifiedHtml;
  contentHtml.value = modifiedHtml;
}

onMounted(() => {
  contentHtml.value =
    ssrContext?.modifiedHtml || processHtmlContent(props.data.content);
});

const wrapperClasses = computed(() => {
  return [
    styles.wrapper,
    !props.data.imageUrl?.length ? styles.wrapperColor : "",
  ];
});
</script>

<template>
  <section
    :id="data._id"
    :class="[styles.block, { [styles.reverse]: data.imageUrl?.length }]"
  >
    <div class="container">
      <div :class="wrapperClasses">
        <div v-html="contentHtml" :class="styles.content"></div>

        <div v-if="data.imageUrl?.length" :class="styles.img">
          <NuxtImg
            :src="`unsplash${data.imageUrl[0]?.path}`"
            :alt="data.imageUrl[0]?.alt || 'image'"
            width="400"
            loading="lazy"
            quality="25"
            sizes="xs:100vw sm:100vw md:50vw lg:50vw xl:33vw"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped module>
.block {
  margin: 7.5rem 0;

  @include media(tablet) {
    margin: 3rem 0;
  }
}

.wrapper {
  display: flex;
  flex-wrap: nowrap;
  gap: 2rem;
  width: 100%;

  @include media(tablet) {
    flex-direction: column;
  }
}

.wrapperColor {
  background-color: #f0f0f0;
  padding: 1.75rem;
  border-radius: 1.875rem;
  background: var(--background-02);

  @include media(tablet) {
    padding: 1.875rem 1rem;
  }
}

.reverse:nth-child(odd) .wrapper {
  flex-direction: row-reverse;

  @include media(tablet) {
    flex-direction: column;
  }
}

.content {
  flex: 1;
}

.img {
  flex: 1;
  border-radius: 1.875rem;
  overflow: hidden;
  background: var(--background-02);

  @include media(tablet) {
    height: 12rem;
    min-height: 12rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

a {
  color: var(--color-01);
}

.image {
  padding-top: 1rem;
}
</style>
