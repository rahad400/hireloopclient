
const BrowseJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string[] | string | undefined }>
}) => {
    const query = await searchParams
    const queryString =  new URLSearchParams (query as Record<string,string>).toString()
    console.log(queryString)
  return (
    <div>
      <h1>browse jobs page</h1>
    </div>
  )
}

export default BrowseJobsPage
