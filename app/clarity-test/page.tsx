'use client';

import { useEffect } from 'react';
import Link from 'next/link';

// Extend Window interface to include clarity
declare global {
  interface Window {
    clarity: (action: string, ...args: unknown[]) => void;
  }
}

export default function ClarityTestPage() {
  useEffect(() => {
    // Check if Clarity is loaded
    const checkClarity = () => {
      if (typeof window !== 'undefined' && window.clarity) {
        console.log('✅ Microsoft Clarity is loaded and ready!');
        console.log('Clarity instance:', window.clarity);
        
        // Test if we can send a custom event
        try {
          window.clarity('event', 'clarity_test_page_loaded');
          console.log('✅ Test event sent to Clarity');
        } catch (error) {
          console.error('❌ Error sending test event:', error);
        }
      } else {
        console.log('⏳ Clarity not yet loaded, checking again...');
        setTimeout(checkClarity, 500);
      }
    };

    // Start checking after a short delay
    setTimeout(checkClarity, 1000);
  }, []);

  const handleTestClick = () => {
    if (typeof window !== 'undefined' && window.clarity) {
      try {
        window.clarity('event', 'test_button_clicked');
        alert('Test event sent to Clarity! Check the console for details.');
      } catch (error) {
        console.error('Error sending test event:', error);
        alert('Error sending test event. Check console for details.');
      }
    } else {
      alert('Clarity is not loaded yet. Please wait and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Microsoft Clarity Test Page</h1>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Clarity Integration Status</h2>
          <p className="mb-4">
            This page helps you verify that Microsoft Clarity is working correctly.
          </p>
          
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="font-semibold mb-2">Steps to verify Clarity is working:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Open your browser&apos;s Developer Tools (F12)</li>
                <li>Go to the <strong>Network</strong> tab</li>
                <li>Refresh this page</li>
                <li>Look for requests to <code>clarity.ms</code> domain</li>
                <li>You should see requests like:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li><code>https://www.clarity.ms/tag/rqueo5xfod</code> (script load)</li>
                    <li><code>https://www.clarity.ms/collect</code> (data collection)</li>
                  </ul>
                </li>
              </ol>
            </div>
            
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="font-semibold mb-2">Console Messages:</h3>
              <p className="text-sm">Check the browser console for Clarity status messages.</p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <button
            onClick={handleTestClick}
            className="px-6 py-3 bg-[#E0B936FF] text-black rounded-lg hover:bg-yellow-400 transition-colors font-semibold"
          >
            Send Test Event to Clarity
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Test Click Tracking</h3>
              <p className="text-sm mb-2">Click anywhere on this card to test click tracking</p>
              <div className="h-20 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 transition-colors flex items-center justify-center">
                Click me!
              </div>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Test Hover Tracking</h3>
              <p className="text-sm mb-2">Hover over this area to test mouse tracking</p>
              <div className="h-20 bg-gray-700 rounded hover:bg-blue-600 transition-colors flex items-center justify-center">
                Hover me!
              </div>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Test Scroll Tracking</h3>
              <p className="text-sm mb-2">Scroll down to test scroll tracking</p>
              <div className="h-20 bg-gray-700 rounded flex items-center justify-center">
                Scroll down ↓
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
          
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold">If you don&apos;t see Clarity requests:</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Make sure you&apos;re using the correct project ID: <code>rqueo5xfod</code></li>
                <li>Check if ad blockers are blocking the script</li>
                <li>Verify the script is in the HTML head section</li>
                <li>Try a hard refresh (Ctrl+F5 or Cmd+Shift+R)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold">Expected Network Requests:</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Initial load:</strong> GET request to <code>clarity.ms/tag/rqueo5xfod</code></li>
                <li><strong>Data collection:</strong> POST requests to <code>clarity.ms/collect</code></li>
                <li><strong>Frequency:</strong> Data is sent periodically, not on every action</li>
              </ul>
            </div>
          </div>
        </div>        <div className="mt-8 text-center">
          <Link 
            href="/"
            className="inline-block px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Back to Basketball Assessment
          </Link>
        </div>

        {/* Add some content to enable scrolling */}
        <div className="mt-16 space-y-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Test Section {i}</h3>
              <p>
                This is test content to enable scrolling. Clarity will track how users scroll through this content.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
