'use client'
import { FormEvent } from "react"
import { useState } from "react"
import axios from "axios"
import React from 'react'
// import { caveat, dancing_script } from '@/components/fonts'
import { useQuery } from "@tanstack/react-query"
import ReactMarkdown from 'react-markdown'

const HandwrittenReport = (props: propsType) => {
    const [reportPrompt, setReportPrompt] = useState<string>('')
    const [buttonState, setButtonState] = useState<'generate' | 'download'>('generate')
    const aiResponse = useQuery({
        queryKey: ['aiResponse'], queryFn: async () => {
            const response = axios.post('/api/generateText', { prompt: reportPrompt })
            setReportPrompt('')
            const responseData = await response
            return responseData.data.response
        }, enabled: false
    })
    const pdfUrl = useQuery({
        queryKey: ['pdfUrl'], queryFn: async () => {
            const response = await axios.post('/api/generatePdf', { text: aiResponse.data })
            const blob = new Blob([response.data], { type: 'application/pdf' })
            const url = URL.createObjectURL(blob)
            return url
        }, enabled: false
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        reportPrompt.trim()
        aiResponse.refetch()
        setButtonState('generate')
    }

    const handlePdfButtonClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (buttonState === 'generate') {
            setButtonState('download')
            pdfUrl.refetch()
        } else {
            const link = document.createElement('a')
            link.href = pdfUrl.data!
            link.download = 'handwritten-report.pdf'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    return (
        <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name={props.radioGroup} />
            <div className="collapse-title text-xl font-medium">Report Writing
                <hr />
            </div>

            <div className="collapse-content pr-10">
                <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-5">
                    <textarea placeholder="Enter your prompt" className="textarea textarea-primary"
                        value={reportPrompt} onChange={(e) => setReportPrompt(e.target.value)} />
                    <button type="submit" className="btn btn-primary w-max ml-auto" disabled={reportPrompt === ''}>Submit Prompt</button>
                </form>
                {(aiResponse.isFetched || aiResponse.isFetching) &&
                    <div className="text-lg font-medium flex flex-col gap-2">Response:
                        {aiResponse.isFetching && <span className="loading loading-lg text-secondary"></span>}
                        {(aiResponse.isFetched && !aiResponse.isFetching) &&
                            <ReactMarkdown className="text-primary">{aiResponse.data}</ReactMarkdown>
                        }
                        <button className="btn btn-primary w-max" onClick={(e) => handlePdfButtonClick(e)}
                            disabled={aiResponse.isFetching || pdfUrl.isFetching}>
                            {buttonState === 'generate' ? 'Generate PDF' :
                                (pdfUrl.isFetching ? <span className="loading loading-bars loading-md text-secondary"></span> : 'Download PDF')}
                        </button>
                    </div>
                }
            </div>

        </div>
    )
}

export default HandwrittenReport

interface propsType {
    radioGroup: string
}