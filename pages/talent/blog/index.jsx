import React from 'react'
import BlogList from '../../../components/unauthorized/BlogList'
import BlogLayout from './layout'

export default function page() {
  return (
    <BlogLayout>
      <BlogList />
    </BlogLayout>
  )
}
