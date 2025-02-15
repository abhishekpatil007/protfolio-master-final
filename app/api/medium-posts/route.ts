import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Replace 'YOUR_MEDIUM_USERNAME' with your actual Medium username
    const mediumUsername = 'abhishek01patil';
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`
    );
    
    const data = await response.json();
    
    // Format the posts data
    const posts = data.items.map((item: any) => ({
      title: item.title,
      description: item.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
      pubDate: item.pubDate,
      link: item.link,
    })).slice(0, 4); // Get only the 4 most recent posts

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
