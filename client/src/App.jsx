import React, { useState } from "react";
import ControlPanel from "./components/ControlPanel";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import RecentTimelines from "./components/RecentTimelines";
import TimelineFeed from "./components/TimelineFeed";

function App() {
  const [event, setEvent] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentTimelines, setRecentTimelines] = useState([]);

  const handleGenerateTimeline = async (settings) => {
    try {
      setLoading(true);
      setError("");
      const eventResponse = await fetch(
        "http://localhost:5000/api/generate-event",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            period: settings.period,
            eventType: settings.eventType,
          }),
        }
      );

      const eventData = await eventResponse.json();

      if (!eventData.success) {
        throw new Error(eventData.error || "Failed to generate event");
      }

      setEvent(eventData.data);

      const postsResponse = await fetch(
        "http://localhost:5000/api/generate-posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event: eventData.data,
            platform: settings.platform,
            tone: settings.tone,
            personalities: settings.selectedPersonalities,
          }),
        }
      );

      const postsData = await postsResponse.json();

      if (!postsData.success) {
        throw new Error(postsData.error || "Failed to generate posts");
      }

      setPosts(postsData.data);

      const newTimeline = {
        id: Date.now(),
        title: eventData.data.title,
        period: settings.period,
        platform: settings.platform,
        date: new Date().toISOString(),
      };

      setRecentTimelines((prev) => [newTimeline, ...prev.slice(0, 4)]);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto py-8 px-4">
        {!event && !loading && !error && (
          <div className="mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-2">
              Welcome to Time Traveler's Social Media
            </h2>
            <p className="mb-4">
              Imagine how historical figures would react to major events if they
              had social media.
            </p>
            <div className="bg-white/20 p-3 rounded-lg text-sm">
              <p>
                💡 <strong>How it works:</strong> Select a time period,
                customize your options, and see how people might have posted
                about historical events!
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-4rem)]">
          <div className="lg:col-span-1 space-y-6 h-full overflow-y-auto p-2">
            <ControlPanel onGenerate={handleGenerateTimeline} />
            {recentTimelines.length > 0 && (
              <RecentTimelines
                timelines={recentTimelines}
                onSelect={(id) => console.log("Selected timeline:", id)}
              />
            )}
          </div>
          <div className="lg:col-span-2 h-full overflow-y-auto p-2">
            {loading ? (
              <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-md p-6">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow">
                <h3 className="font-bold mb-2">Error Occurred</h3>
                <p>{error}</p>
                <button
                  onClick={() => setError("")}
                  className="mt-3 text-sm bg-red-100 hover:bg-red-200 text-red-700 py-1 px-3 rounded transition duration-200"
                >
                  Dismiss
                </button>
              </div>
            ) : posts.length > 0 ? (
              <TimelineFeed event={event} posts={posts} />
            ) : (
              <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">
                  Choose your parameters
                </h2>
                <p className="text-gray-600">
                  Select a time period or enter a custom one, then click
                  "Generate Timeline" to see how social media might have looked
                  during famous events throughout history and future!
                </p>
                <div className="flex justify-center my-4">
                  <img
                    src="/img.webp"
                    alt="Timeline illustration"
                    className="rounded-lg w-[1000px] h-[500px]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
