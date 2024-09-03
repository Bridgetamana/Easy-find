import React from 'react'
import BlogDetails from '../../components/unauthorized/BlogDetails'
import BlogList from '../../components/unauthorized/BlogList'
import BlogLayout from './layout'

export default function page() {
  return (
    <BlogLayout>
      <BlogDetails />
      <BlogList />
    </BlogLayout>
  )
}
