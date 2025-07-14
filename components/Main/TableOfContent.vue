<script setup>
import { ref, useCssModule } from "vue";
const styles = useCssModule();

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const isOpen = ref(false);

function toggle() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <section v-if="data.article?.blocks.length" :class="styles.block">
    <div class="container">
      <nav :class="[styles.wrapper, { [styles.open]: isOpen }]">
        <div :class="styles.head" @click="toggle">
          <span :class="styles.title">{{ $t("table_of_content") }}</span>
          <span :class="[styles.arrow, { [styles.active]: isOpen }]">
            <Icon :name="isOpen ? 'ep:minus' : 'ep:plus'" style="color: #000" />
          </span>
        </div>

        <div :class="[styles.listWrapper, { [styles.active]: isOpen }]">
          <ul
            :class="styles.list"
            itemscope
            itemtype="https://schema.org/ItemList"
          >
            <li
              v-for="(item, index) in data.article.blocks"
              :key="item._id"
              :class="styles.item"
              itemprop="itemListElement"
              itemscope
              itemtype="https://schema.org/ListItem"
            >
              <a :href="'#' + item._id" itemprop="url">
                <meta itemprop="position" :content="index + 1" />
                <span itemprop="name" :class="styles.text"
                  >{{ index + 1 }}. {{ item.H2 }}</span
                >
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </section>
</template>

<style lang="scss" scoped module>
.block {
  margin: 3rem 0 7.5rem 0;

  @include media(tablet) {
    margin: 2rem 0 5rem 0;
  }
}

.wrapper {
  width: 100%;
  padding: 1rem 2rem;
  border: 0.063rem solid var(--border);
  border-radius: 62.5rem;
  border: 0.063rem solid var(--color-04);
  background: var(--color-gradient);
  transition: all 0.3s ease;
  &.open {
    border-radius: 2.75rem;
  }
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
}

.title {
  font-size: 0.875rem;
  font-family: var(--font-01);
  font-weight: 400;
  color: var(--color-black-02);

  @include media(tablet) {
    font-size: 0.875rem;
  }
}

.arrow {
  display: inline-block;
  transition: transform 0.3s;
  font-size: 1.5rem;

  @include media(tablet) {
    font-size: 0.875rem;
  }

  &.active {
    transform: rotate(180deg);
  }
}

.listWrapper {
  max-height: 0;
  overflow: hidden;
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;
  opacity: 0;

  &.active {
    max-height: 25rem;
    opacity: 1;
  }
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  padding: 1rem 0 0;
  margin: 0;
  counter-reset: toc-counter;
}

.item {
  color: var(--color-black-02);
  position: relative;
  transition: all 0.3s;
  counter-increment: toc-counter;
  opacity: 0.8;
  font-size: 0.875rem;
  margin: 0;

  &:hover {
    color: var(--color-white);
    opacity: 1;
  }

  a {
    color: inherit;
    font-size: inherit;
  }

  &:before {
    display: none;
  }
}
</style>
