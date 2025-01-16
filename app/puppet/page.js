"use client"

import React, { useEffect, useState } from 'react'

const page = () => {

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

export default page