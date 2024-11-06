import { getUser } from '@propelauth/nextjs/server/app-router';
import { NextResponse } from 'next/server'
import OpenAI from 'openai';

export async function POST(request: Request) {
    const user = await getUser();
    if (!user) {
        return NextResponse.json({ message: "You must be logged in to generate a coupon." }, { status: 401 });
    }

    const activeOrg = user.getActiveOrg();
    if (!activeOrg || !activeOrg.isAtLeastRole("Admin")) { 
        return NextResponse.json({ message: "You need to be a Store Manager or Owner to create a coupon." }, 
            { status: 403 });
    }

    const body = await request.json();
    const discount = body.discount;
    if (typeof discount !== 'number' || isNaN(discount)) {
        return NextResponse.json({ message: "Discount must be a valid number." }, { status: 400 });
    }
    const groceryStore = activeOrg.orgName;
    
    const openai = new OpenAI();
    const image = await openai.images.generate({ 
        model: 'dall-e-3',
        size: "1792x1024",
        prompt: `a coupon for ${discount}% off any purchase at ${groceryStore}` 
    });
    
    const imageUrl = image.data[0].url;
    return NextResponse.json({ image: imageUrl })
}
