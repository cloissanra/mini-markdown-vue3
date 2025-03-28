/**
 * 获取Markdown文本的目录结构
 */
export default function extractToc(text: string): { level: number; text: string; id: string }[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: { level: number; text: string; id: string }[] = [];

  // 用于跟踪每个级别标题的计数
  const levelCounts: Record<number, number> = {};

  let match;
  while ((match = headingRegex.exec(text)) !== null) {
    const level = match[1].length;
    const headingText = match[2].trim();

    // 更新该级别标题的计数
    levelCounts[level] = (levelCounts[level] || 0) + 1;

    // 生成基于级别和索引的id
    let id: string;

    if (level === 1) {
      id = `title-${levelCounts[level]}`;
    } else if (level === 2) {
      id = `subtitle-${levelCounts[level]}`;
    } else {
      id = `heading-${level}-${levelCounts[level]}`;
    }

    toc.push({ level, text: headingText, id });
  }

  return toc;
}
