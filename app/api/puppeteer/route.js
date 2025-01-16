import { NextResponse } from "next/server";
import puppeteer from 'puppeteer';
import puppeteerCore from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request) {
    try {
        // THE CORE LOGIC
        let browser;
        if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production') {
            // Configure the version based on your package.json (for your future usage).
            const executablePath = await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar')
            browser = await puppeteerCore.launch({
                executablePath,
                // You can pass other configs as required
                args: chromium.args,
                headless: chromium.headless,
                defaultViewport: chromium.defaultViewport
            })
        } else {
            browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            })
        }
        const page = await browser.newPage();

        // Navigate the page to a URL.
        await page.goto('https://developer.chrome.com/');

        const pageTitle1 = await page.title();
        console.log("PAGE TITLE ---------------------- ", pageTitle1)
        // Navigate the page to a URL.
        await page.goto('https://facebook.com/');
        const pageTitle2 = await page.title();



        await browser.close();

        return new NextResponse(JSON.stringify({ message: `${pageTitle1}__ ${pageTitle2}` }), {
            status: 200,
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    } catch (error) {
        console.error(' error getting title:', error.message);
        return NextResponse.json(
            { message: 'Error getting title' },
            { status: 500 }
        );
    }
}
