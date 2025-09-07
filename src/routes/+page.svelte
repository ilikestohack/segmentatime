<script lang="ts">
    export let data;
    const fs = data.firstSegment
    console.log('Page data:', data);

    async function sendToServer(text: string) {
        await fetch("/api/save-note", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ segmentId: fs?.id, text })
        });
    }
</script>

<svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Time Management System</title>
    <!-- <script src="https://cdn.tailwindcss.com"></script> -->
</svelte:head>


<div class="max-w-4xl mx-auto">
    <!-- Header -->
    <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2 pt-2">Time Management System</h1>
        <p class="text-neutral">Today's Schedule for {data.user.name}</p>
        <div class="flex">
            <svg 
                class="w-6 h-6 text-red-500" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <!-- Outer green rind -->
                <circle cx="12" cy="12" r="10" fill="green" />

                <!-- Inner red flesh (inherits Tailwind color via currentColor) -->
                <circle cx="12" cy="12" r="8" fill="currentColor" />

                <!-- Seeds -->
                <ellipse cx="12" cy="8" rx="0.6" ry="1" fill="black"/>
                <ellipse cx="9" cy="11" rx="0.6" ry="1" fill="black"/>
                <ellipse cx="15" cy="11" rx="0.6" ry="1" fill="black"/>
                <ellipse cx="10.5" cy="15" rx="0.6" ry="1" fill="black"/>
                <ellipse cx="13.5" cy="15" rx="0.6" ry="1" fill="black"/>
            </svg>
            <p class="text-neutral ml-1">{data.user.points} Points</p>
        </div>
    </header>

    <!-- Current Segment (Highlighted) -->
    <div class="bg-white rounded-lg shadow-lg border-l-4 border-primary p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
                <div class="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span class="text-sm font-medium text-primary uppercase tracking-wide">Current</span>
            </div>
            <!-- <div class="text-sm text-neutral">9:00 AM - 10:30 AM</div> -->
        </div>
        
        <div class="mb-4">
            <h2 class="text-xl font-bold text-gray-900 mb-1">{fs?.type}</h2>
            <h3 class="text-lg text-neutral">{fs?.title}</h3>
        </div>

        <div class="grid md:grid-cols-2 gap-6 mb-6">
            <div class="space-y-4">
                <!-- Time Allotted -->
                <div class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-neutral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-sm font-medium">Time Allotted: {fs?.timeAllocation} minutes</span>
                </div>

                <!-- Limits -->
                <div class="space-y-2">
                    <h4 class="text-sm font-medium text-gray-900">Limits:</h4>
                    <div class="flex flex-wrap gap-2">
                        <div class="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                            </svg>
                            {fs?.maxBreaks} Break Max
                        </div>
                        {#each fs!.limits as limit}
                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">{limit}</span>
                        {/each}
                    </div>
                </div>
            </div>

            <!-- Points Section -->
            <div class="space-y-2">
                <h4 class="text-sm font-medium text-gray-900">Points:</h4>
                <div class="grid grid-cols-3 gap-2 w-fit">
                    <!-- Watermelon slice icons -->
                    {#each Array.from({ length: 6 }) as _, index}
                        <svg 
                            class="w-6 h-6 {index < fs!.pointsAvailable ? 'text-red-500' : 'text-green-600'}" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <!-- Outer green rind -->
                            <circle cx="12" cy="12" r="10" fill="green" />

                            <!-- Inner red flesh (inherits Tailwind color via currentColor) -->
                            <circle cx="12" cy="12" r="8" fill="currentColor" />

                            <!-- Seeds -->
                            <ellipse cx="12" cy="8" rx="0.6" ry="1" fill="black"/>
                            <ellipse cx="9" cy="11" rx="0.6" ry="1" fill="black"/>
                            <ellipse cx="15" cy="11" rx="0.6" ry="1" fill="black"/>
                            <ellipse cx="10.5" cy="15" rx="0.6" ry="1" fill="black"/>
                            <ellipse cx="13.5" cy="15" rx="0.6" ry="1" fill="black"/>
                        </svg>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Notes Input -->
        <div class="mb-6">
            <label class="block text-sm font-medium text-gray-900 mb-2">Details/Notes:</label>
            <textarea 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none" 
                rows="3"
                on:input={(e) => sendToServer((e.target as HTMLTextAreaElement).value)}
                placeholder="Add notes about this segment...">{fs?.notes}</textarea>
        </div>

        <!-- Control Buttons -->
        <div class="flex flex-wrap gap-3">
            <form method="POST" action="?/complete">
                <button type="submit" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Complete
                </button>
            </form>
            <button class="bg-accent text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Pause
            </button>
            <button class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Extend
            </button>
            <form method="POST" action="?/skip">
                <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Skip
                </button>
            </form>
            <a href="./edit/{fs?.id}" class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Edit
            </a>
        </div>
    </div>

    <!-- Upcoming Segments -->
    <div class="space-y-4">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Upcoming Segments</h2>
        
        <!-- Segment 1 -->
         
        {#each data.segments as segment, index}
            <div class="bg-white rounded-lg shadow p-6 border-l-4 border-gray-300">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-sm font-medium text-gray-500 uppercase tracking-wide">{index + 1}</span>
                    <div class="flex items-center gap-3">
                        <a href="./edit/{segment.id}" class="text-gray-500 hover:text-gray-700 transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </a>
                        <!-- <div class="text-sm text-neutral">10:30 AM - 11:00 AM</div> -->
                    </div>
                </div>
                
                <div class="mb-3">
                    <h3 class="text-lg font-bold text-gray-900 mb-1">{segment.type}</h3>
                    <h4 class="text-base text-neutral">{segment.title}</h4>
                </div>

                <div class="flex items-center gap-4 text-sm text-neutral">
                    <span>{segment.timeAllocation} minutes</span>
                    <div class="flex gap-1"> 
                        <div class="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                            </svg>
                            {segment.maxBreaks} Break Max
                        </div>
                        {#each segment.limits as limit}
                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">{limit}</span>
                        {/each}
                    </div>
                </div>
            </div>
        {/each}

        <!-- Segment 2 -->
        <!-- <div class="bg-white rounded-lg shadow p-6 border-l-4 border-gray-300">
            <div class="flex items-center justify-between mb-3">
                <span class="text-sm font-medium text-gray-500 uppercase tracking-wide">Later</span>
                <div class="flex items-center gap-3">
                    <button class="text-gray-500 hover:text-gray-700 transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </button>
                    <div class="text-sm text-neutral">11:00 AM - 12:30 PM</div>
                </div>
            </div>
            
            <div class="mb-3">
                <h3 class="text-lg font-bold text-gray-900 mb-1">Meetings</h3>
                <h4 class="text-base text-neutral">Team Standup & Client Call</h4>
            </div>

            <div class="flex items-center gap-4 text-sm text-neutral">
                <span>90 minutes</span>
                <div class="flex gap-1">
                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Collaborative</span>
                    <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">External</span>
                </div>
            </div>
        </div> -->

        <!-- Segment 3 -->
        <!-- <div class="bg-white rounded-lg shadow p-6 border-l-4 border-gray-300">
            <div class="flex items-center justify-between mb-3">
                <span class="text-sm font-medium text-gray-500 uppercase tracking-wide">Afternoon</span>
                <div class="flex items-center gap-3">
                    <button class="text-gray-500 hover:text-gray-700 transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </button>
                    <div class="text-sm text-neutral">1:30 PM - 3:00 PM</div>
                </div>
            </div>
            
            <div class="mb-3">
                <h3 class="text-lg font-bold text-gray-900 mb-1">Implementation</h3>
                <h4 class="text-base text-neutral">Code Review & Bug Fixes</h4>
            </div>

            <div class="flex items-center gap-4 text-sm text-neutral">
                <span>90 minutes</span>
                <div class="flex gap-1">
                    <span class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">No Interruptions</span>
                    <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Technical</span>
                </div>
            </div>
        </div> -->
    </div>

    <div class="fixed bottom-6 right-6 flex items-center gap-3">
        <!-- User editor button -->
        <a
            class="p-4 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-lg"
            aria-label="Edit User"
            href="/user"
        >
            <!-- person icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        </a>

        <!-- Create item button -->
        <a
            class="p-4 rounded-full bg-green-600 text-white hover:bg-green-700 shadow-xl"
            aria-label="Create Item"
            href="/edit/-1"
        >
            <!-- plus icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
        </a>
    </div>
</div>