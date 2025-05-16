import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, StatusBar } from 'react-native';

const App = (props) => {
  const [message, setMessage] = useState([
    { 
      text: 'Kumusta! I\'m your Filipino seafood assistant. I can help you with questions about local fish like Bangus, Lapu-lapu, Tilapia, and Dalagang-bukid, their prices, cooking tips, and more. How can I help you today?', 
      sender: 'bot' 
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');

  // Your API credentials
  const API_KEY = 'AIzaSyATPxOEgu4gNq5IIjWUpf4zWfLrOUF-_bg';
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  // Enhanced seafood keywords including Filipino fish names and related terms
  const seafoodKeywords = [
    // Filipino fish names
    'bangus', 'milkfish', 'lapu-lapu', 'grouper', 'tilapia', 'dalagang-bukid', 
    'maya-maya', 'red snapper', 'tuna', 'bariles', 'tanigue', 'galunggong', 
    'alumahan', 'espada', 'hasa-hasa', 'malasugue', 'pompano', 'talakitok',
    
    // Shellfish and marine life
    'hipon', 'shrimp', 'prawns', 'pusit', 'squid', 'octopus', 'pugita',
    'tahong', 'mussels', 'talaba', 'oyster', 'kinason', 'scallops',
    'alimango', 'crab', 'lobster', 'clams', 'halaan',
    
    // General terms
    'fish', 'seafood', 'isda', 'marine', 'ocean', 'sea', 'dagat',
    'fishing', 'pangingisda', 'market', 'palengke', 'wet market',
    'fresh', 'frozen', 'dry', 'tuyo', 'smoked', 'inihaw',
    
    // Cooking methods
    'grilled', 'fried', 'steamed', 'sinigang', 'paksiw', 'kinilaw',
    'adobo', 'escabeche', 'bistek', 'tinola', 'nilaga', 'recipe',
    'cook', 'prepare', 'luto', 'lutuin', 'paano magluto',
    
    // Price related
    'price', 'presyo', 'magkano', 'cost', 'rate', 'market price',
    'wholesale', 'retail', 'kilo', 'peso', 'how much', 'mahal', 'mura'
  ];

  // Updated function to check seafood relation with case-insensitive matching
  const isSeafoodRelated = (text) => {
    const lowerText = text.toLowerCase();
    return seafoodKeywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
  };

  // Function to provide context-aware responses based on specific seafood mentioned
  const getSeafoodContext = (text) => {
    const lowerText = text.toLowerCase();
    let context = '';
    
    if (lowerText.includes('bangus') || lowerText.includes('milkfish')) {
      context += ' Bangus (milkfish) is the Philippines\' national fish, known for its adaptability and widespread availability. Current market price is around ₱260 per kilo.';
    }
    
    if (lowerText.includes('lapu-lapu') || lowerText.includes('grouper')) {
      context += ' Lapu-lapu is a premium fish popular for special occasions, typically priced at ₱548 per kilo.';
    }
    
    if (lowerText.includes('tilapia')) {
      context += ' Tilapia is widely farmed in the Philippines and is one of the most affordable fish options at ₱150 per kilo.';
    }
    
    if (lowerText.includes('dalagang-bukid')) {
      context += ' Dalagang-bukid is a popular mid-range fish option, currently priced at ₱356.50 per kilo.';
    }
    
    if (lowerText.includes('price') || lowerText.includes('presyo') || lowerText.includes('magkano')) {
      context += ' As of March 26, 2025, here are the current seafood prices: Bangus ₱260/kg, Dalagang-bukid ₱356.50/kg, Lapu-lapu ₱548/kg, Tilapia ₱150/kg.';
    }
    
    return context;
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.botMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.sender === 'user' && styles.userMessageText
      ]}>
        {item.text}
      </Text>
    </View>
  );

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    // Check if the message is related to seafood
    if (!isSeafoodRelated(inputText)) {
      const userMessage = { text: inputText, sender: 'user' };
      setMessage(prev => [...prev, userMessage]);
      setMessage(prev => [...prev, {
        text: 'Sorry, I can only help with seafood-related questions about Filipino fish, cooking methods, market prices, and seafood recommendations. Please ask me about Bangus, Lapu-lapu, Tilapia, Dalagang-bukid, or any other seafood-related topics.',
        sender: 'bot'
      }]);
      setInputText('');
      return;
    }
    
    const userMessage = { text: inputText, sender: 'user' };
    setMessage(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      // Get context about specific seafood mentioned
      const seafoodContext = getSeafoodContext(inputText);
      
      const requestBody = {
        contents: [{
          parts: [{
            text: `You are a Filipino seafood expert assistant specializing in Philippine seafood. Focus on local fish like Bangus (milkfish), Lapu-lapu (grouper), Tilapia, Dalagang-bukid, and other Filipino seafood. 
            
            Current market prices (as of March 26, 2025):
            - Bangus: ₱260/kg
            - Dalagang-bukid: ₱356.50/kg  
            - Lapu-lapu: ₱548/kg
            - Tilapia: ₱150/kg
            
            Respond in a friendly, informative manner using both English and Filipino terms when appropriate. If asked about prices, mention the current rates above.
            
            ${seafoodContext}
            
            User's question: ${inputText}`
          }]
        }]
      };
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I couldn\'t process your request. Please try again.';

      setMessage(prev => [...prev, { text: responseText, sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessage(prev => [...prev, {
        text: 'Sorry, I encountered an error processing your seafood question. Please try again. If the issue persists, our app updates prices daily to ensure accuracy.',
        sender: 'bot'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1976D2" barStyle="light-content" />
      
      {/* Header with wave pattern */}
      <View style={styles.header}>
        <View style={styles.waveBackground} />
       <TouchableOpacity 
  style={styles.backButton}
  onPress={() => {
    // Close the chatbot modal
    props.onClose && props.onClose();
  }}
>
  <Text style={styles.backButtonText}>← Home</Text>
</TouchableOpacity>
        <Text style={styles.headerTitle}>SyntaxDevs</Text>
        <Text style={styles.headerSubtitle}>🐟 Filipino Seafood Assistant 🦐</Text>
      </View>
      
      <FlatList
        data={message}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messagesList}
      />
      
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="🐠 Ask about Filipino seafood prices, cooking tips..."
            placeholderTextColor="#81C784"
            style={styles.input}
            editable={!loading}
            multiline={true}
            maxLength={500}
          />
          <TouchableOpacity
            onPress={handleSend}
            style={[styles.sendButton, loading && styles.disabledButton]}
            disabled={loading}
          >
            <Text style={styles.sendButtonText}>
              {loading ? '🌊' : '🚀'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD' // Light ocean blue background
  },
  header: {
    backgroundColor: '#1976D2', // Deep ocean blue
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
    position: 'relative',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  backButton: {
    position: 'absolute',
    top: 45,
    left: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    zIndex: 1,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  waveBackground: {
    position: 'absolute',
    bottom: -15,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#42A5F5',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    opacity: 0.7,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E1F5FE',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '500',
  },
  messagesList: {
    padding: 16,
    paddingBottom: 100, // Extra space for input area
  },
  messageContainer: {
    maxWidth: '85%',
    padding: 14,
    borderRadius: 20,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#00695C', // Deep teal
    borderBottomRightRadius: 8,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderColor: '#81C784', // Light green border
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#263238', // Dark grey
  },
  userMessageText: {
    color: '#FFFFFF'
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 2,
    borderTopColor: '#81C784',
    padding: 12,
    elevation: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#F1F8E9', // Very light green
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 8,
    color: '#263238',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#1976D2', // Ocean blue
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  sendButtonText: {
    fontSize: 24,
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: '#B0BEC5',
  }
});

export default App;