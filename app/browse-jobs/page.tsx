import React from "react"

const BrowseJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string[] | string | undefined }>
}) => {
    const query = await searchParams
    console.log(query)
  return (
    <div>
      <h1>browse jobs page</h1>
    </div>
  )
}

export default BrowseJobsPage
