#!/usr/bin/env node

const { execSync } = require('child_process')
const { existsSync, lstatSync, mkdirSync, readdirSync } = require('fs')
const { join } = require('path')

const storyPath = `story/${new Date().getFullYear()}`
const storyDir = join(process.cwd(), `content/${storyPath}`)

if (!existsSync(storyDir)) {
  mkdirSync(storyDir)
}

const stories = readdirSync(storyDir).filter(name => lstatSync(join(storyDir, name)).isDirectory())
const number = 1 + stories.length

execSync(`hugo new ${storyPath}/${number < 10 ? '0' : ''}${number}/index.md`)
