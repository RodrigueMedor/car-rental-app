import { useState, useRef, useEffect } from 'react'
import { getTravelRecommendations } from '../services/aiService'
import { destinations } from '../data/destinations'
import { useLocation } from 'react-router-dom'

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hi! 👋 I'm your AI Travel Assistant. How can I help you plan your Florida trip today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [tripContext, setTripContext] = useState({})
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef(null)
  const location = useLocation()

  // Don't show on the travel planner page since it has the full chatbot
  if (location.pathname === '/travel-planner') {
    return null
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setUnreadCount(0)
    }
  }, [messages, isOpen])

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
          const recommendation = `🎉 Here's your trip plan for ${result.destination.city}:

🚗 **Vehicle**: ${result.bestVehicle.year} ${result.bestVehicle.make} ${result.bestVehicle.model}
💡 **Why**: ${result.bestVehicle.matchReason}
${result.tip ? `💡 **Tip**: ${result.tip}` : ''}

**Attractions**: ${result.attractions.slice(0, 3).join(', ')}

Want more details or help booking?`
          
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
          content: "Sorry, I'm having trouble connecting. Please try again.",
          timestamp: new Date()
        }])
      }
      
      setLoading(false)
    } else {
      // Ask for missing information
      const missingInfo = getMissingInfo(updatedDetails)
      const prompt = `I'd love to help! Could you tell me: ${missingInfo.join(', ')}?`
      
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
      'help': 'What can you help me with?'
    }
    setInput(actions[action] || action)
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
        >
          <div className="relative">
            {/* Pulse Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-teal-500 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-teal-500 rounded-full animate-pulse opacity-30"></div>
            
            {/* Main Button */}
            <div className="relative w-16 h-16 bg-gradient-to-br from-primary-500 via-primary-600 to-teal-600 rounded-full shadow-2xl shadow-primary-500/50 hover:shadow-primary-500/70 transition-all duration-300 hover:scale-110 hover:-translate-y-1 flex items-center justify-center border-2 border-white/20">
              <span className="text-3xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">🤖</span>
              
              {/* Unread Badge */}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-red-500/40 border-2 border-white animate-bounce">
                  {unreadCount}
                </span>
              )}
              
              {/* Shine Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              AI Travel Assistant
              <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-primary-700 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <h3 className="font-bold text-sm">AI Travel Assistant</h3>
                <p className="text-xs text-teal-100">Plan your Florida trip</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 shadow-sm ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-xs leading-relaxed">
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-200">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-3 py-2 bg-white border-t border-gray-100">
            <div className="flex flex-wrap gap-1">
              {['Miami', 'Orlando', 'Help'].map((action) => (
                <button
                  key={action}
                  onClick={() => handleQuickAction(action.toLowerCase())}
                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium text-gray-600 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-200">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !loading && input.trim()) {
                    e.preventDefault()
                    handleSendMessage(e)
                  }
                }}
                placeholder="Ask about your trip..."
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-xs transition-all"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-10 h-10 bg-gradient-to-br from-primary-500 via-primary-600 to-teal-600 text-white rounded-xl hover:from-primary-600 hover:via-primary-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/30 flex items-center justify-center group"
              >
                {loading ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
