import { createFileRoute, Outlet } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/calculators')({
  component: CalculatorsLayout,
})

function CalculatorsLayout() {
  return (
    <div className="w-full">
      {/* Outlet — это системное окно, через которое фреймворк будет показывать все твои вложенные калькуляторы */}
      <Outlet />
    </div>
  )
}
