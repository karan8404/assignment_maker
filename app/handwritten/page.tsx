'use client'

import HandwrittenReport from "@/components/handwrittenReport"
import HandwrittenAssignment from "@/components/handwrittenAssignment"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient()

const page = () => {

    return (
        <div className='flex flex-col gap-5'>
            <QueryClientProvider client={queryClient}>
                <HandwrittenReport radioGroup="handwritten-accordion" />

                <HandwrittenAssignment radioGroup="handwritten-accordion" />
            </QueryClientProvider>
        </div >
    )
}

export default page