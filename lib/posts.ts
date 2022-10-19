import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export type PostData = {
    id: string,
    contentHtml: string,
    title: string,
    date: string,
}

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf-8')
        const matterResult = matter(fileContents)

        return {
            id,
            ...matterResult.data,
        }
    }) as Array<PostData>
    return allPostsData.sort(({ date: a }, { date: b }) => {
        return b.localeCompare(a)
    })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            }
        }
    })
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')

    const matterResult = matter(fileContents)

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)

    const contentHtml = processedContent.toString()

    return {
        id,
        contentHtml,
        ...matterResult.data,
    }
}