<template>
  <div ref="demoRoot" class="react-memo-demo" />
</template>

<script setup lang="ts">
import {
  createElement,
  memo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface ContactCardProps {
  name: string
  address: string
}

interface RenderCardProps extends ContactCardProps {
  label: string
  renderCount: number
  tone: 'regular' | 'memo'
}

function RenderCard({
  label,
  name,
  address,
  renderCount,
  tone,
}: RenderCardProps) {
  return createElement(
    'article',
    { className: `react-memo-demo__card react-memo-demo__card--${tone}` },
    createElement(
      'div',
      { className: 'react-memo-demo__card-heading' },
      createElement('strong', null, label),
      createElement(
        'span',
        { className: 'react-memo-demo__render-count', 'aria-live': 'polite' },
        `${renderCount} render${renderCount === 1 ? '' : 's'}`,
      ),
    ),
    createElement(
      'p',
      { className: 'react-memo-demo__name' },
      name || 'Anonymous',
    ),
    createElement(
      'p',
      { className: 'react-memo-demo__address' },
      address || 'No address yet',
    ),
  )
}

function RegularContactCard({ name, address }: ContactCardProps) {
  const renderCount = useRef(0)
  renderCount.current += 1

  return createElement(RenderCard, {
    label: 'Regular component',
    name,
    address,
    renderCount: renderCount.current,
    tone: 'regular',
  })
}

const MemoizedContactCard = memo(function MemoizedContactCard({
  name,
  address,
}: ContactCardProps) {
  const renderCount = useRef(0)
  renderCount.current += 1

  return createElement(RenderCard, {
    label: 'Memoized component',
    name,
    address,
    renderCount: renderCount.current,
    tone: 'memo',
  })
})

interface FieldProps {
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function Field({ label, value, onChange }: FieldProps) {
  return createElement(
    'label',
    { className: 'react-memo-demo__field' },
    createElement('span', null, label),
    createElement('input', { value, onChange }),
  )
}

function Demo(): ReactNode {
  const [name, setName] = useState('Ada Lovelace')
  const [address, setAddress] = useState('Lagos, Nigeria')
  const [unrelatedCount, setUnrelatedCount] = useState(0)

  return createElement(
    'section',
    { className: 'react-memo-demo__panel' },
    createElement(
      'div',
      { className: 'react-memo-demo__controls' },
      createElement(Field, {
        label: 'Name',
        value: name,
        onChange: (event) => setName(event.target.value),
      }),
      createElement(Field, {
        label: 'Address',
        value: address,
        onChange: (event) => setAddress(event.target.value),
      }),
      createElement(
        'button',
        {
          type: 'button',
          className: 'react-memo-demo__button',
          onClick: () => setUnrelatedCount((count) => count + 1),
        },
        `Update unrelated state (${unrelatedCount})`,
      ),
    ),
    createElement(
      'div',
      { className: 'react-memo-demo__cards' },
      createElement(RegularContactCard, { name, address }),
      createElement(MemoizedContactCard, { name, address }),
    ),
    createElement(
      'p',
      { className: 'react-memo-demo__hint' },
      'Update unrelated state: the regular component renders again, while memo() skips the memoized component because its props did not change.',
    ),
  )
}

const demoRoot = ref<HTMLElement>()
let root: Root | undefined

onMounted(() => {
  if (!demoRoot.value) return
  root = createRoot(demoRoot.value)
  root.render(createElement(Demo))
})

onBeforeUnmount(() => {
  root?.unmount()
})
</script>

<style>
.react-memo-demo {
  width: min(900px, 92vw);
  color: var(--slidev-theme-primary, #0f172a);
  font-size: 16px;
  text-align: left;
}

.react-memo-demo__panel {
  display: grid;
  gap: 18px;
  padding: 22px;
  border: 1px solid rgb(148 163 184 / 35%);
  border-radius: 16px;
  background: rgb(255 255 255 / 84%);
  box-shadow: 0 18px 50px rgb(15 23 42 / 10%);
}

.dark .react-memo-demo__panel {
  background: rgb(15 23 42 / 78%);
  box-shadow: 0 18px 50px rgb(0 0 0 / 22%);
}

.react-memo-demo__controls {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)) auto;
  gap: 12px;
  align-items: end;
}

.react-memo-demo__field {
  display: grid;
  gap: 6px;
  color: inherit;
  font-size: 0.78rem;
  font-weight: 700;
}

.react-memo-demo__field input {
  width: 100%;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid rgb(148 163 184 / 55%);
  border-radius: 9px;
  background: rgb(255 255 255 / 92%);
  color: #0f172a;
  font: inherit;
  font-weight: 500;
}

.react-memo-demo__field input:focus-visible,
.react-memo-demo__button:focus-visible {
  outline: 3px solid rgb(34 197 94 / 35%);
  outline-offset: 2px;
}

.react-memo-demo__button {
  min-height: 42px;
  padding: 10px 14px;
  border: 0;
  border-radius: 9px;
  background: #0f766e;
  color: white;
  font: inherit;
  font-weight: 750;
  cursor: pointer;
}

.react-memo-demo__button:hover {
  background: #115e59;
}

.react-memo-demo__cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.react-memo-demo__card {
  display: grid;
  gap: 6px;
  min-width: 0;
  padding: 16px;
  border: 1px solid rgb(148 163 184 / 35%);
  border-radius: 12px;
  background: rgb(248 250 252 / 80%);
}

.dark .react-memo-demo__card {
  background: rgb(30 41 59 / 85%);
}

.react-memo-demo__card--memo {
  border-color: rgb(20 184 166 / 55%);
}

.react-memo-demo__card-heading {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.react-memo-demo__render-count {
  flex: none;
  padding: 3px 8px;
  border-radius: 999px;
  background: rgb(15 118 110 / 12%);
  color: #0f766e;
  font-size: 0.72rem;
  font-weight: 800;
}

.dark .react-memo-demo__render-count {
  color: #5eead4;
}

.react-memo-demo__name,
.react-memo-demo__address,
.react-memo-demo__hint {
  margin: 0;
}

.react-memo-demo__name {
  font-size: 1.05rem;
  font-weight: 800;
}

.react-memo-demo__address,
.react-memo-demo__hint {
  color: rgb(71 85 105);
}

.dark .react-memo-demo__address,
.dark .react-memo-demo__hint {
  color: rgb(203 213 225);
}

.react-memo-demo__hint {
  font-size: 0.78rem;
  line-height: 1.45;
}

@media (max-width: 760px) {
  .react-memo-demo__controls,
  .react-memo-demo__cards {
    grid-template-columns: 1fr;
  }
}
</style>
