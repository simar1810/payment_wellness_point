"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectApp = () => {
  const router = useRouter();

  useEffect(() => {
    // Function to detect user's platform
    const redirectToStore = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/android/i.test(userAgent)) {
        // Redirect to Google Play Store if on Android
        window.location.href = 'https://play.google.com/store/apps/details?id=com.wellnessz.twp';
    
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        // Redirect to Apple App Store if on iOS
        window.location.href = 'https://apps.apple.com/in/app/the-wellness-point/id6504709088';
      } else {
        // Optional: You can redirect to a web page or display a message for unsupported devices
        router.push('/');
      }
    };

    redirectToStore();
  }, [router]);

  return null; // No need to render anything, just redirect
};

export default RedirectApp;
