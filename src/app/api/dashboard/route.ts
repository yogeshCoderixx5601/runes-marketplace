import dbConnect from "@/lib/dbconnect"
import { User } from "@/models"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest){
    console.log("**********inside user runes api************")
    try {
      const ordinal_address = req.nextUrl.searchParams.get('ordinal_address');
      // const ordinal_address= "bc1qm045gn6vk6umsq3p7qjp0z339l9ksqyt7cwnnr"
      console.log(ordinal_address,"-ordinal_address")
      await dbConnect()
      const result =  await User.find({ordinal_address})
      console.log(result,"result")
      return NextResponse.json({result,success:true,message:"user runes get"})
    } catch (error) {
      return NextResponse.json({success:false,message:"false"})
    }
}