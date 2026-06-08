import { useState, useRef, useEffect } from 'react'
import { getTravelRecommendations } from '../services/aiService'
import { destinations } from '../data/destinations'

export default function TravelChatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hi! 👋 I'm your AI Travel Assistant for Florida. I can help you plan the perfect trip, recommend vehicles, and suggest local attractions. Where would you like to go?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [tripContext, setTripContext] = useState({})
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const extractTripDetails = (userMessage) => {
    const details = { ...tripContext }
    const lowerMessage = userMessage.toLowerCase()

    // Extract destination
    destinations.forEach(dest => {
      if (lowerMessage.includes(dest.city.toLowerCase()) || lowerMessage.includes(dest.state.toLowerCase())) {
        details.destination = dest.city
      }
    })

    // Extract number of travelers
    const travelerMatch = lowerMessage.match(/(\d+)\s*(traveler|person|people|guest)/i)
    if (travelerMatch) {
      details.travelers = parseInt(travelerMatch[1])
    }

    // Extract budget
    const budgetMatch = lowerMessage.match(/\$?(\d{3,5})/i)
    if (budgetMatch) {
      const budget = parseInt(budgetMatch[1])
      if (budget >= 300 && budget <= 10000) {
        details.budget = budget
      }
    }

    // Extract purpose
    const purposes = ['vacation', 'business', 'family', 'road trip', 'honeymoon', 'group']
    purposes.forEach(purpose => {
      if (lowerMessage.includes(purpose)) {
        details.purpose = purpose.charAt(0).toUpperCase() + purpose.slice(1)
      }
    })

    // Extract dates
    const dateMatch = lowerMessage.match(/(\d{4}-\d{2}-\d{2})/g)
    if (dateMatch) {
      if (dateMatch.length >= 1) details.startDate = dateMatch[0]
      if (dateMatch.length >= 2) details.endDate = dateMatch[1]
    }

    return details
  }

  const generateContextResponse = (details) => {
    const responses = []
    
    if (details.destination && !tripContext.destination) {
      responses.push(`Great choice! ${details.destination} is wonderful. `)
    }
    
    if (details.travelers && !tripContext.travelers) {
      responses.push(`Got it, planning for ${details.travelers} traveler${details.travelers > 1 ? 's' : ''}. `)
    }
    
    if (details.budget && !tripContext.budget) {
      responses.push(`Budget of $${details.budget} noted. `)
    }
    
    if (details.purpose && !tripContext.purpose) {
      responses.push(`Perfect for a ${details.purpose} trip! `)
    }
    
    if (details.startDate && !tripContext.startDate) {
      responses.push(`Starting ${details.startDate}. `)
    }
    
    if (details.endDate && !tripContext.endDate) {
      responses.push(`Until ${details.endDate}. `)
    }

    return responses.join('')
  }

  const getMissingInfo = (details) => {
    const missing = []
    if (!details.destination) missing.push('destination')
    if (!details.travelers) missing.push('number of travelers')
    if (!details.budget) missing.push('budget')
    if (!details.startDate) missing.push('start date')
    if (!details.endDate) missing.push('end date')
    return missing
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newUserMessage])

    // Extract trip details from message
    const updatedDetails = extractTripDetails(userMessage)
    setTripContext(updatedDetails)

    // Generate context acknowledgment
    const contextResponse = generateContextResponse(updatedDetails)
    
    if (contextResponse) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          role: 'assistant',
          content: contextResponse,
          timestamp: new Date()
        }])
      }, 500)
    }

    // Check if we have enough info to make recommendations
    const missing = getMissingInfo(updatedDetails)
    
    if (missing.length === 0) {
      setLoading(true)
      
      // Prepare form data for AI service
      const formData = {
        destination: updatedDetails.destination,
        travelers: updatedDetails.travelers || 2,
        startDate: updatedDetails.startDate,
        endDate: updatedDetails.endDate,
        budget: updatedDetails.budget || 1000,
        purpose: updatedDetails.purpose || 'Vacation'
      }

      try {
        const res = await getTravelRecommendations(formData)
        
        if (res.error) {
          setMessages(prev => [...prev, {
            id: prev.length + 1,
            role: 'assistant',
            content: `Sorry, I encountered an error: ${res.error}. Please try again.`,
            timestamp: new Date()
          }])
        } else {
          const result = res.data
          const recommendation = `🎉 Perfect! Here's your personalized trip plan for ${result.destination.city}, ${result.destination.state}:

📍 **Destination**: ${result.destination.city} - ${result.destination.vibe}
💰 **Estimated Cost**: $${result.estimatedCost}
🚗 **Recommended Vehicle**: ${result.bestVehicle.year} ${result.bestVehicle.make} ${result.bestVehicle.model} (${result.bestVehicle.type})
💡 **Why this vehicle**: ${result.bestVehicle.matchReason}
${result.tip ? `💡 **Pro tip**: ${result.tip}` : ''}

**Popular Attractions**:
${result.attractions.map(a => `• ${a}`).join('\n')}

**Suggested Services**:
${result.recommendedServices.map(s => `• ${s.name} - ${s.price > 0 ? `$${s.price}` : 'Free'}`).join('\n')}

Would you like me to help you book any of these or provide more details?`
          
          setMessages(prev => [...prev, {
            id: prev.length + 1,
            role: 'assistant',
            content: recommendation,
            timestamp: new Date(),
            data: result
          }])
        }
      } catch (error) {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          role: 'assistant',
          content: "Sorry, I'm having trouble connecting to my AI service. Please try again.",
          timestamp: new Date()
        }])
      }
      
      setLoading(false)
    } else {
      // Ask for missing information
      const missingInfo = getMissingInfo(updatedDetails)
      const prompt = `I'd love to help you plan your trip! Could you please tell me: ${missingInfo.join(', ')}?`
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          role: 'assistant',
          content: prompt,
          timestamp: new Date()
        }])
      }, 800)
    }
  }

  const handleQuickAction = (action) => {
    const actions = {
      'miami': 'I want to visit Miami',
      'orlando': 'I want to visit Orlando',
      'family': 'This is a family trip',
      'business': 'This is for business',
      'vacation': 'This is a vacation',
      'help': 'What can you help me with?'
    }
    setInput(actions[action] || action)
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-primary-700 text-white px-6 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur">
            🤖
          </div>
          <div>
            <h1 className="text-xl font-bold">AI Travel Assistant</h1>
            <p className="text-sm text-teal-100">Plan your perfect Florida trip</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🤖</span>
                    <span className="text-xs font-medium text-gray-500">AI Assistant</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
                <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl px-5 py-3 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🤖</span>
                  <span className="text-xs font-medium text-gray-500">AI Assistant</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-2">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {['Miami', 'Orlando', 'Family Trip', 'Business', 'Vacation'].map((action) => (
              <button
                key={action}
                onClick={() => handleQuickAction(action.toLowerCase())}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell me about your trip plans..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary-500/30"
            >
              {loading ? '...' : 'Send'}
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-2 text-center">
            I can help you plan trips, recommend vehicles, and suggest attractions in Florida
          </p>
        </div>
      </div>
    </div>
  )
}
