"use client";
import styles from "./page.module.css";
import {useUser, useRedirectFunctions, useLogoutFunction} from "@propelauth/nextjs/client";
import { useState } from "react";

export default function Home() {
  const {loading, user} = useUser()
  const {redirectToSignupPage, redirectToLoginPage, redirectToAccountPage} = useRedirectFunctions()
  const logoutFn = useLogoutFunction()
  const org = user?.getActiveOrg();
  const [discount, setDiscount] = useState(0);
  const [couponImage, setCouponImage] = useState(null);
  const [isImageGenerating, setIsImageGenerating] = useState(false);

  const createNewCoupon = async (event: React.FormEvent) => {
      event.preventDefault();

      setIsImageGenerating(true);
        setCouponImage(null);
      try {
          const response = 
              await fetch(`/api/coupons`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      discount: discount
                  })
              })
          const data = await response.json()
          setCouponImage(data.image);
      } catch (error) {
            console.error(error)
      } finally {
            setIsImageGenerating(false);
      }
  }
  return (
  <div className={styles.page}>
    <main className={styles.main}>
      { loading ? <div>Loading...</div> : null }

      { user ? 
      <div>
          <p>You are logged in as {user.email}</p>
          <p>You are in organization: {org!.orgName}</p>
          
          <button onClick={() => redirectToAccountPage()}>Account</button>
          <button onClick={logoutFn}>Logout</button>

          <h2>Digital Coupon Generation</h2>
          { org!.isAtLeastRole("Admin") ? 
              <div>
                  <form onSubmit={createNewCoupon}>
                      <p>
                          <label htmlFor="store">Grocery Store: </label>
                          <input type="text" placeholder={org?.orgName} disabled={true} id="store" />
                      </p>
                      <p>
                          <label htmlFor="discount">Discount (%): </label>
                          <input 
                            type="text" 
                            value={discount} 
                            onChange={(e) => setDiscount(Number(e.target.value))} 
                            id="discount" 
                          />
                      </p>
                      <button type="submit">Generate Coupon</button>
                  </form>

                  {couponImage && <img src={couponImage} style={{ height: '400px' }} alt="Coupon" />}
                  {isImageGenerating && <p>Generating coupon image...</p>}
              </div>
          : <p>You need to be a Store Manager or Owner to create a coupon.</p> }
      </div>
  :
    <div>
          <p>You are not logged in</p>
          <button onClick={() => redirectToLoginPage()}>Login</button>
          <button onClick={() => redirectToSignupPage()}>Signup</button>
    </div>
  }
    </main>
  </div>
  );
}
