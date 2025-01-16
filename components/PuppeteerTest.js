"use client"

import React, { useState, useEffect } from 'react'

const PuppeteerTest = () => {
    const [data, setData] = useState(null)


    useEffect(() => {

        fetch('api/puppeteer')
            .then((res) => res.json())
            .then((data) => {
                console.log(data.message)
                setData(data)
            })
    }, [])

    return (
        <div>
            {data ? <p>{data.message}</p>
                :
                <p>loading...</p>
            }
        </div>
    )
}

export default PuppeteerTest