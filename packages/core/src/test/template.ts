export default function getHtmlTemplate (markdownHtml: string): string { 
  const htmlTemplate = 
`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown渲染测试</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      width: 60vw;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    pre {
      background-color: #f5f5f5;
      padding: 16px;
      border-radius: 4px;
      overflow: auto;
    }
    code {
      font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    }
    code.inline-code {
      background: ghostwhite;
    }
    blockquote {
      border-left: 4px solid #ddd;
      padding-left: 16px;
      margin-left: 0;
      color: #666;
    }
    a {
      color: #0366d6;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    h1, h2, h3, h4, h5, h6 {
      margin-top: 24px;
      margin-bottom: 16px;
      font-weight: 600;
      line-height: 1.25;
    }
    h1 {
      font-size: 2em;
      padding-bottom: 0.3em;
    }
    h2 {
      font-size: 1.5em;
      padding-bottom: 0.3em;
    }
    ul, ol {
      padding-left: 2em;
    }
    hr {
      border: 0;
      width: 100%;
      height: 1px;
      box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
      margin: 16px 0;
    }
  </style>
</head>
<body>
  ${markdownHtml}
</body>
</html>
`;
  return htmlTemplate;
}