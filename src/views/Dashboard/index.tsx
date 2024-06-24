"use client"
import { addUser } from '@/apiHelper/addUserDetails';
import { useWalletAddress } from 'bitcoin-wallet-adapter';
import React, { useEffect } from 'react'

const DashboardPage = () => {
  const walletDetails = useWalletAddress()
  const addUserDetails = async() => {
    try {
      if(walletDetails && walletDetails.wallet && walletDetails.connected){
        const user = await addUser(walletDetails)
        console.log(user,"---user")
      }
    } catch (error) {
      console.log(error,"error")
    }
  }
    useEffect(() => {
      addUserDetails();
    }, [walletDetails]);
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage