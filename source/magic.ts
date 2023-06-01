

import puppeteer from 'puppeteer-extra'

import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha'
//import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(RecaptchaPlugin());

import { setTimeout } from "timers/promises";
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(
	RecaptchaPlugin({
		provider: {
			id: '2captcha',
			token: 'c8e7c879f034cab8fac5db7b4bb6873a' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
		},
		visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
	})
).use(StealthPlugin())


export function feedTheDragons(): void {
	// Sometimes you need to initialize stuff.
	// Like feeding dragons before you can fight them all day long.
	console.log('Feed the dragons…');

	console.log('Looks like they arnt hungry anymore. But somehow the poeple helping you transporting the food are gone too…');
}


let previousValue: string = '';


export async function tryScrapping(callback: any): Promise<void> {

	let browser = null;

	while (true) {
		try {
			// const userAgent = randomUseragent.getRandom();
			// console.log(process.env.DEBUG);
			browser =
				//  await puppeteer.connect({
				// 	browserWSEndpoint: `wss://chrome.browserless.io?token=f5b5c341-13ab-4b1e-8a35-ff2ac5676a2d&headless=false`,
				// });
				await (puppeteer).launch({
					args: ['--no-sandbox']
				});


			const page = await browser.newPage();

			// //Randomize viewport size
			// await page.setViewport({
			// 	width: 1920 + Math.floor(Math.random() * 100),
			// 	height: 3000 + Math.floor(Math.random() * 100),
			// 	deviceScaleFactor: 1,
			// 	hasTouch: false,
			// 	isLandscape: false,
			// 	isMobile: false,
			// });

			// await page.setUserAgent(userAgent);
			// await page.setJavaScriptEnabled(true);
			// await page.setDefaultNavigationTimeout(0);

			await page.goto('https://armenia.blsspainvisa.com/book_appointment.php', { waitUntil: "networkidle0" });

			await page.solveRecaptchas();

			try {
				await page.select('#centre', '56#93');
				await setTimeout(500);

				await page.select('#category', 'Normal');
				//await page.$eval('#category', (el: any) => el.value = 'Normal');

				await setTimeout(500);
				await page.focus('#phone');
				await page.keyboard.type('123456');
				await page.focus('#email');
				await page.keyboard.type('abc@example.com');
				await page.click('input[name="save"]');

				await page.waitForSelector('button[name="agree"]');
				await setTimeout(500);
				await page.click('button[name="agree"]');
				await page.waitForSelector('input[id="app_date"]');
				await setTimeout(500);
				await page.click('input[id="app_date"]');

				const element = await page.waitForSelector('div.datepicker-dropdown'); // select the element
				if (element) {
					const value = await element.evaluate((el: any) => el.innerHTML);
					if (!previousValue) {
						previousValue = value;
						callback('remembered value');
					}

					if (previousValue !== value) {
						previousValue = value;
						callback('value changed');
					} else {
						console.log('value has not changed');
					}
				}

			}
			catch (err) {
				await page.screenshot({
					path: 'screenshot.jpg'
				});
				callback(err);
			}
		} catch (error) {
			callback(error);
		} finally {
			if (browser) {
				browser.close();
			}
		}

		await setTimeout(31 * 60 * 1000);
	}
}

export function fightDragons(): string {
	// In a folder like this you can do stuff not directly related to your Telegram bot.
	// When your bot will need to fight dragons but doesnt do it by itself this is the right place to do it.
	return 'Fought the dragon. Dragon vanished. No treasure. Sad.';
}

export function danceWithFairies(): string {
	const thoughtsWhileDancing = [
		'No one else can see the fairies but you.',
		'People think you are crazy.',
		'But that is ok.',
		'Everyone is.',
	];

	return thoughtsWhileDancing.join('\n');
}
