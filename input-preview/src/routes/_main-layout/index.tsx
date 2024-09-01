import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main-layout/')({
  component: () => <div>Hello /!</div>
})