import React, { useState } from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,TextInput,ScrollView,Modal,Image,Dimensions,ImageBackground,} from 'react-native';
import Chatbot from './components/Chatbot';
const { width, height } = Dimensions.get('window');

// Mock data for seafood items
const seafoodData = [

  { "name": "Alumahan",
    "tagalog_name": "Alumahan",
    "english_name": "Indian Mackerel",
    "scientific_name": "Rastrelliger kanagurata",
    "description": "A small coastal pelagic fish found in tropical Indo-Pacific waters, known for its rich flavor and commonly used in Filipino dishes like paksiw and sinigang.",
    "price": 375.00,
    "last_price": 360.00,
    "weight": "per 500g",
    "category": "fish",
    "image": "https://cdn.shopify.com/s/files/1/0463/2041/8983/products/FreshAlumahan_1200x1200.jpg?v=1600068009"
   
  },
  {
    "name": "Arosep Seaweed",
    "tagalog_name": "Arosep",
    "english_name": "Sea Grapes",
    "scientific_name": "Caulerpa lentillifera",
    "description": "A type of green seaweed known for its tiny, grape-like appearance and crisp texture, often eaten raw in salads (ensaladang latô) with vinegar and tomatoes.",
    "price": 179.00,
    "last_price": 169.00,
    "weight": "per 500g",
    "category": "seaweed",
    "image": "https://lh4.googleusercontent.com/-ZxKNTUKTqAs/TYcMouxq6iI/AAAAAAAAASM/wFShLegTU6U/s1600/arocep-foodamn.jpg"
 
  },
  {
    "name": "Bangus",
    "tagalog_name": "Bangus",
    "english_name": "Milkfish",
    "scientific_name": "Chanos chanos",
    "description": "The national fish of the Philippines, prized for its tender white flesh. Commonly prepared grilled, fried, or as sinigang. Known for its numerous fine bones.",
    "price": 212.25,
    "last_price": 199.00,
    "weight": "per kg",
    "category": "fish",
    "image": "https://4rfreshandfrozen.com/cdn/shop/products/Bangus_2048x2048.jpg?v=1586090940"
 
  },
  {
    "name": "Asohos",
    "tagalog_name": "Asohos",
    "english_name": "Silver-banded Whiting",
    "scientific_name": "Sillago nigrofasciata",
    "description": "A slender, silver-white fish with dark bands, found in sandy coastal waters. Its delicate, sweet flavor makes it ideal for frying or grilling.",
    "price": 425.00,
    "last_price": 440.00,
    "weight": "per 500g",
    "category": "fish",
    "image": "https://cdn.shopify.com/s/files/1/0363/4577/4219/products/asuhos.jpg?v=1636626680"

  },
  {
    "name": "Dalagang Bukid",
    "tagalog_name": "Dalagang Bukid",
    "english_name": "Redbelly Yellowtail Fusilier",
    "scientific_name": "Caesio cuning",
    "description": "A vibrant reef fish with a red belly and yellow tail, commonly found in schools. Its firm flesh is suitable for frying and grilling.",
    "price": 345.00,
    "last_price": 350.00,
    "weight": "per 500g",
    "category": "fish",
    "image": "https://www.fishtaseafood.com/cdn/shop/products/Dalagangbukid4.png?v=1692667699&width=1000"

  },
  {
    "name": "Dapa",
    "tagalog_name": "Dapa",
    "english_name": "Indian Halibut",
    "scientific_name": "Psettodes erumei",
    "description": "A flatfish with both eyes on one side of its head, allowing it to lie flat on the seafloor. Known for its delicate flavor and tender texture.",
    "price": 795.00,
    "last_price": 790.00,
    "weight": "per kg",
    "category": "fish",
    "image": "https://safeselect.ph/cdn/shop/products/Dapa_0151d462-6585-4147-bf57-5ee054aa351a_300x300.jpg?v=1641872322"

  },
  {
    "name": "Espada",
    "tagalog_name": "Espada",
    "english_name": "Largehead Hairtail",
    "scientific_name": "Trichiurus lepturus",
    "description": "A long, slender fish with a metallic sheen and sharp teeth. Its soft, white flesh is commonly grilled or fried.",
    "price": 795.00,
    "last_price": 815.00,
    "weight": "per kg",
    "category": "fish",
    "image": "https://i.pinimg.com/originals/bb/32/b0/bb32b0da8971e4fc72a83bca7fb398cc.jpg"
 
  },
  {
    "name": "Galunggong",
    "tagalog_name": "Galunggong",
    "english_name": "Round Scad",
    "scientific_name": "Decapterus macrosoma",
    "description": "A small, affordable fish with a distinct flavor, often dubbed the 'poor man's fish' in the Philippines. Commonly fried or used in stews.",
    "price": 245.00,
    "last_price": 230.00,
    "weight": "per 500g",
    "category": "fish",
    "image": "https://preview.redd.it/galunggong-poor-mans-fish-no-more-v0-p7aut9c30vqa1.jpg?auto=webp&s=4366604accfb2dc21a952f916a03aa311f1179ac"
 
     },
  {
    "name": "Hasa Hasa",
    "tagalog_name": "Hasa Hasa",
    "english_name": "Short Mackerel",
    "scientific_name": "Rastrelliger brachysoma",
    "description": "A common Filipino fish known for its firm flesh, perfect for frying or in paksiw dishes.",
    "price": 345.00,
    "last_price": 325.00,
    "weight": "per 500g",
    "category": "fish",
    "image": "https://4rfreshandfrozen.com/cdn/shop/products/HasaHasaShortbodiedmackerel_1200x1200.jpg?v=1587543354"
 
  },
  {
    "name": "Lapu-Lapu Black Genuine",
    "tagalog_name": "Lapu-Lapu",
    "english_name": "Grouper (Black)",
    "scientific_name": "Epinephelus spp.",
    "description": "A premium reef fish with firm flesh, often steamed or fried whole in festive Filipino meals.",
    "price": 1250.00,
    "last_price": 1225.00,
    "weight": "per kg",
    "category": "fish",
    "image": "https://i.pinimg.com/originals/d2/65/af/d265af040a45319197dc60b6a6e88dc3.jpg"

  },
  {
    "name": "Lato Seaweed",
    "tagalog_name": "Lato",
    "english_name": "Sea Grapes",
    "scientific_name": "Caulerpa lentillifera",
    "description": "A type of edible green seaweed known for its pop-in-the-mouth texture, commonly eaten with vinegar.",
    "price": 189.00,
    "last_price": 185.00,
    "weight": "per 500g",
    "category": "seaweed",
    "image": "https://i.pinimg.com/originals/ee/36/95/ee36955d9886b5df2e285d767b8c1656.jpg"

  },
  {
    "name": "Matambaka",
    "tagalog_name": "Matambaka",
    "english_name": "Bigeye Scad",
    "scientific_name": "Selar crumenophthalmus",
    "description": "A versatile fish often dried, fried, or grilled in local households across the Philippines.",
    "price": 645.00,
    "last_price": 630.00,
    "weight": "per kg",
    "category": "fish",
    "image": "https://farmtodoorstep.co/wp-content/uploads/2021/10/matambaka.jpg"
 
  },
  {
    "name": "Maya Maya",
    "tagalog_name": "Maya Maya",
    "english_name": "Red Snapper",
    "scientific_name": "Lutjanus campechanus",
    "description": "A beautiful red fish with mild, flaky flesh; ideal for sinigang or grilled preparations.",
    "price": 1275.00,
    "last_price": 1250.00,
    "weight": "per kg",
    "category": "fish",
    "image": "https://as1.ftcdn.net/v2/jpg/03/53/76/26/1000_F_353762672_F2DOURu1vnH11LTIPGnVbOyKURcgYhKd.jpg"

  },
  {
    "name": "Salay Ginto",
    "tagalog_name": "Salay Ginto",
    "english_name": "Golden Threadfin Bream",
    "scientific_name": "Nemipterus virgatus",
    "description": "A golden-hued fish ideal for frying and sweet and sour dishes.",
    "price": 285.00,
    "last_price": 270.00,
    "weight": "per 500g",
    "category": "fish",
    "image": "https://cdn.shopify.com/s/files/1/0269/7723/9113/products/salayginto_530x@2x.jpg?v=1660037035"
     
  },
  {
    "name": "Sapsap",
    "tagalog_name": "Sapsap",
    "english_name": "Slipmouth Fish",
    "scientific_name": "Leiognathus spp.",
    "description": "A small flat fish known for its soft meat, usually fried or used in escabeche.",
    "price": 245.00,
    "last_price": 235.00,
    "weight": "per 500g",
    "category": "fish",
    "image": "https://3.bp.blogspot.com/-XnOhcA6xbEA/TgL84H6_F6I/AAAAAAAACdM/FhtRiFrNiNQ/s1600/sapsap.JPG"
     
  },
  {
    "name": "Shrimp ",
    "tagalog_name": "Hipon",
    "english_name": "Shrimp",
    "scientific_name": "Metapenaeus spp.",
    "description": "shrimps commonly used in soups, sinigang, or tortang hipon.",
    "price": 725.00,
    "last_price": 715.00,
    "weight": "per 500g",
    "category": "crustacean",
    "image": "https://www.thespruceeats.com/thmb/RMMy3iMj7YjIIf9b0evqR_ThYu4=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/rawshrimp_getty2400-56a498603df78cf77283283c.jpg"
   
  },
  {
    "name": "Squid ",
    "tagalog_name": "Pusit",
    "english_name": "Squid",
    "scientific_name": "Sepioteuthis lessoniana",
    "description": "Thick-fleshed squid excellent for stuffing and grilling.",
    "price": 755.00,
    "last_price": 745.00,
    "weight": "per kg",
    "category": "cephalopod",
    "image": "https://images.wisegeek.com/three-squid.jpg"
  
  },
  {
    "name": "Tahong",
    "tagalog_name": "Tahong",
    "english_name": "Mussels",
    "scientific_name": "Perna viridis",
    "description": "green mussels perfect for grilling, baking, or seafood platters.",
    "price": 269.00,
    "last_price": 255.00,
    "weight": "per kg",
    "category": "shellfish",
    "image": "https://journalnews.com.ph/wp-content/uploads/2023/08/Tahong.jpg"
     
  },
  {
    "name": "Tawilis",
    "tagalog_name": "Tawilis",
    "english_name": "Freshwater Sardine",
    "scientific_name": "Sardinella tawilis",
    "description": "The only freshwater sardine in the world, found in Taal Lake. Usually fried and dipped in vinegar.",
    "price": 165.00,
    "last_price": 155.00,
    "weight": "per 500g",
    "category": "fish",
    "image": "https://cebudailynews.inquirer.net/files/2019/01/large.jpg"

  },
  {
    "name": "Tiger Prawns",
    "tagalog_name": "Sugpo",
    "english_name": "Tiger Prawns",
    "scientific_name": "Penaeus monodon",
    "description": "tiger prawns ideal for grilling, sizzling plates, and seafood platters.",
    "price": 1895.00,
    "last_price": 1850.00,
    "weight": "per kg",
    "category": "crustacean",
    "image": "https://bradleysfish.com/wp-content/uploads/2021/05/Whole-Prawns-13-15-1kg-1-Custom.jpg"
   
  },
  {
    "name": "Ulang / River Prawns",
    "tagalog_name": "Ulang",
    "english_name": "Freshwater River Prawns",
    "scientific_name": "Macrobrachium rosenbergii",
    "description": "Large freshwater prawns known for their sweet meat, often grilled or cooked in coconut milk.",
    "price": 1745.00,
    "last_price": 1725.00,
    "weight": "per kg",
    "category": "crustacean",
    "image": "https://www.undercurrentnews.com/wp-content/uploads/2018/11/shutterstock_58595518.jpg"
     
  },
  {
    "name": "Yellow Fin",
    "tagalog_name": "Yellow Fin",
    "english_name": "Yellowfin Tuna",
    "scientific_name": "Thunnus albacares",
    "description": "A popular tuna species with lean meat, ideal for sashimi, steaks, and local 'inihaw na tuna'.",
    "price": 625.00,
    "last_price": 615.00,
    "weight": "per kg",
    "category": "fish",
    "image": "https://biologydictionary.net/wp-content/uploads/2021/01/shutterstock_117425023-1-scaled.jpg"
     
    },

]

// Mock news data
const newsData = [
  {
    id: '1',
    title: 'Fishing Ban in Effect',
    description: 'A temporary ban on fishing for certain species is now in effect.',
    time: '2h ago'
  },
  {
    id: '2',
    title: 'Typhoon Alert',
    description: 'A typhoon may affect fishing activities in some areas. Stay safe!',
    time: '5h ago'
  },
  {
    id: '3',
    title: 'Reduced Fish Supply',
    description: 'Expect limited availability, and higher prices for some seafood due to decreased supply.',
    time: '1d ago'
  }
];

export default function SeafoodTracker() {
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedSeafood, setSelectedSeafood] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('Trends');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showChatbotModal, setshowChatbotModal] = useState(false);

  const [reportItem, setReportItem] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [rating, setRating] = useState(0);

  const Tab = ({ title, isActive, onPress }) => (
    <TouchableOpacity
      style={[styles.tab, isActive && styles.activeTab]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const SeafoodCard = ({ item, onPress }) => (
    <TouchableOpacity style={styles.seafoodCard} onPress={() => onPress(item)}>
      <Image source={{ uri: item.image }} style={styles.seafoodImage} />
      <Text style={styles.seafoodName}>{item.name}</Text>
      <Text style={styles.seafoodPrice}>₱{item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  const NewsCard = ({ item }) => (
    <View style={styles.newsCard}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsDescription}>{item.description}</Text>
      <Text style={styles.newsTime}>{item.time}</Text>
    </View>
  );

  const StarRating = () => (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => setRating(star)}
          style={styles.star}
        >
          <Text style={[styles.starText, star <= rating && styles.starActive]}>
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const filteredSeafood = seafoodData.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedSeafood = [...filteredSeafood].sort((a, b) => {
    switch (sortBy) {
      case 'Name':
        return a.name.localeCompare(b.name);
      case 'Price':
        return a.price - b.price;
      case 'Trends':
        return a.trend === 'up' ? -1 : 1;
      default:
        return 0;
    }
  });

  const renderWelcomeScreen = () => (
    <ImageBackground 
      source={{ uri: 'https://via.placeholder.com/400x800/1F4B88/FFFFFF?text=Ocean+Background' }}
      style={styles.welcomeBackground}
    >
      <View style={styles.welcomeOverlay}>
        <Text style={styles.welcomeTitle}>Welcome to,</Text>
        <Text style={styles.appTitle}>SEAFOOD PRICE TRACKER</Text>
        <Text style={styles.countryText}>Philippines</Text>
      </View>
    </ImageBackground>
  );

  const renderDescriptionScreen = () => (
    <ScrollView style={styles.container}>
      <ImageBackground 
        source={{ uri: 'https://via.placeholder.com/400x800/1F4B88/FFFFFF?text=Ocean+Background' }}
        style={styles.descriptionBackground}
      >
        <View style={styles.descriptionOverlay}>
          <View style={styles.descriptionCard}>
            <Text style={styles.descriptionText}>
              "SeaFood Price Tracker" is an interactive website whose sole purpose is to provide Filipino 
              internet users a way to determine the current prices of their beloved seafood delicacies from the 
              comfort of their own home. Our website updates the prices of each fish and mollusk on a daily 
              basis, which makes sure that every person about to go to the supermarket to buy seafood for 
              their beloved families, or themselves, are carrying right amount of money for the purchasing of 
              these delicious sea creatures. Our website is free to be accessed by everyone, because we want 
              every Filipino with a phone and internet connection to be able to use our services. Making this 
              website required time and effort to make, so if you want to show your appreciation for our work, 
              you can willingly send us money in GCash. Our number is 0912-345-6789.
            </Text>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );

  const renderPricesScreen = () => (
    <ScrollView style={styles.container}>
      <ImageBackground 
        source={{ uri: 'https://via.placeholder.com/400x800/1F4B88/FFFFFF?text=Ocean+Background' }}
        style={styles.pricesBackground}
      >
        <View style={styles.pricesOverlay}>
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search seafood..."
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            <View style={styles.sortContainer}>
              <TouchableOpacity
                style={styles.sortButton}
                onPress={() => setShowSortMenu(!showSortMenu)}
              >
                <Text style={styles.sortText}>Sort: {sortBy}</Text>
              </TouchableOpacity>
              {showSortMenu && (
                <View style={styles.sortMenu}>
                  {['Name', 'Category', 'Trends', 'Price'].map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.sortOption}
                      onPress={() => {
                        setSortBy(option);
                        setShowSortMenu(false);
                      }}
                    >
                      <Text style={styles.sortOptionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          <FlatList
            data={sortedSeafood}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SeafoodCard
                item={item}
                onPress={(selectedItem) => {
                  setSelectedSeafood(selectedItem);
                  setModalVisible(true);
                }}
              />
            )}
            contentContainerStyle={styles.seafoodGrid}
            showsVerticalScrollIndicator={false}
          />

          <Text style={styles.lastUpdate}>Last Update : March 26, 2025</Text>
        </View>
      </ImageBackground>
    </ScrollView>
  );

  const renderAboutScreen = () => (
    <View style={styles.container}>
      <Text style={styles.aboutTitle}>About SeaFood Price Tracker</Text>
      <Text style={styles.aboutContent}>
        SeaFood Price Tracker is dedicated to providing accurate and up-to-date seafood prices 
        for Filipino consumers. Our mission is to help families make informed decisions when 
        purchasing seafood by providing transparent pricing information.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Navigation */}
      <View style={styles.navigation}>
        <Text style={styles.logo}>Syntax Devs</Text>
        <View style={styles.tabContainer}>
          <Tab title="Home" isActive={activeTab === 'Home'} onPress={() => setActiveTab('Home')} />
          <Tab title="Description" isActive={activeTab === 'Description'} onPress={() => setActiveTab('Description')} />
          <Tab title="Prices" isActive={activeTab === 'Prices'} onPress={() => setActiveTab('Prices')} />
          <Tab title="About" isActive={activeTab === 'About'} onPress={() => setActiveTab('About')} />
        </View>
      </View>

      {/* Content */}
      {activeTab === 'Home' && renderWelcomeScreen()}
      {activeTab === 'Description' && renderDescriptionScreen()}
      {activeTab === 'Prices' && renderPricesScreen()}
      {activeTab === 'About' && renderAboutScreen()}

      {/* News Modal - appears on Home tab */}
      {activeTab === 'Home' && (
        <View style={styles.newsModal}>
          <Text style={styles.newsModalTitle}>News & Alerts</Text>
          {newsData.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </View>
      )}
      
      {/* Feedback  and Message Modal - appears on Home tab */}
      <View style={styles.feedbackSection}>
        <TouchableOpacity
          style={styles.feedbackButton}
          onPress={() => setShowFeedbackModal(true)}
        >
          <Text style={styles.feedbackButtonText}>Report & Feedback</Text>
        </TouchableOpacity>
        

        <TouchableOpacity
          style={styles.feedbackButton}
          onPress={() => setshowChatbotModal(true)}
        >
          <Text style={styles.feedbackButtonText}>Message</Text>
        </TouchableOpacity>
      </View>
      

      {/* Seafood Detail Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.detailModal}>
            {selectedSeafood && (
              <>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
                
                <Image source={{ uri: selectedSeafood.image }} style={styles.detailImage} />
                
                <View style={styles.detailInfo}>
                  <Text style={styles.detailLabel}>Tagalog name:</Text>
                  <Text style={styles.detailValue}>{selectedSeafood.tagalogName}</Text>
                  
                  <Text style={styles.detailLabel}>English Name:</Text>
                  <Text style={styles.detailValue}>{selectedSeafood.englishName}</Text>
                  
                  <Text style={styles.detailLabel}>Scientific Name:</Text>
                  <Text style={styles.detailValue}>{selectedSeafood.scientificName}</Text>
                </View>
                
                <Text style={styles.detailDescription}>
                  {selectedSeafood.description}
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Feedback Modal */}
      <Modal
        visible={showFeedbackModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFeedbackModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.feedbackModal}>
            <Text style={styles.feedbackTitle}>Feedback & Reports</Text>
            <Text style={styles.feedbackSubTitle}>Report an issue</Text>
            <Text style={styles.feedbackLabel}>Seafood item</Text>
            <TextInput
              style={styles.feedbackInput}
              value={reportItem}
              onChangeText={setReportItem}
              placeholder="Enter seafood name"
            />
            
            <Text style={styles.feedbackLabel}>Describe the issue</Text>
            <TextInput
              style={[styles.feedbackInput, styles.feedbackTextArea]}
              value={reportDescription}
              onChangeText={setReportDescription}
              placeholder="Describe the issue..."
              multiline={true}
              numberOfLines={4}
            />
            
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                // Handle submit logic here
                setShowFeedbackModal(false);
                setReportItem('');
                setReportDescription('');
                setRating(0);
              }}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            
            <Text style={styles.ratingTitle}>Rate the seafood quality</Text>
            <StarRating />
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowFeedbackModal(false)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      
      {/* Feedback Modal */}
      <Modal
        visible={showChatbotModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setshowChatbotModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Chatbot>
          </Chatbot>
        </View>
      </Modal>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: 'rgba(26, 26, 46, 0.9)',
  },
  logo: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'white',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  welcomeBackground: {
    position: 'relative',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  welcomeOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'topcenter',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    color: 'white',
    fontSize: 24,
    marginBottom: 10,
  },
  appTitle: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  countryText: {
    color: 'white',
    fontSize: 24,
    fontStyle: 'italic',
  },
  descriptionBackground: {
    flex: 1,
    width: '100%',
    height: height,
  },
  descriptionOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    justifyContent: 'center',
  },
  descriptionCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    padding: 25,
  },
  descriptionText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    fontStyle: 'italic',
  },
  pricesBackground: {
    flex: 1,
    width: '100%',
    minHeight: height,
  },
  pricesOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 15,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  searchContainer: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: 'white',
    fontSize: 16,
  },
  sortContainer: {
    position: 'relative',
  },
  sortButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  sortText: {
    color: 'white',
    fontSize: 14,
  },
  sortMenu: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    padding: 5,
    minWidth: 120,
    zIndex: 1000,
  },
  sortOption: {
    padding: 10,
    borderRadius: 5,
  },
  sortOptionText: {
    color: 'white',
    fontSize: 14,
  },
  seafoodGrid: {
    paddingBottom: 100,
  },
  seafoodCard: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    margin: 8,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    maxWidth: (width - 60) / 2,
  },
  seafoodImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  seafoodName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  seafoodPrice: {
    color: 'white',
    fontSize: 14,
  },
  lastUpdate: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 20,
  },
  newsModal: {
    position: 'absolute',
    bottom: 150,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    maxHeight: 400,
  },
  newsModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  newsCard: {
    justifyContent:"bottom-center",
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  newsDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  newsTime: {
    fontSize: 10,
    color: '#999',
  },
  feedbackButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    padding: 15,
  },
  feedbackButtonText: {
    color: 'white',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailModal: {
    backgroundColor: 'rgba(70, 70, 70, 0.95)',
    borderRadius: 20,
    padding: 20,
    maxWidth: width * 0.9,
    maxHeight: height * 0.8,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailImage: {
    width: 120,
    height: 120,
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 20,
  },
  detailInfo: {
    marginBottom: 20,
  },
  detailLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailValue: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  detailDescription: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
  },
  feedbackModal: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    maxHeight: height * 0.8,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  feedbackSubTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  feedbackLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  feedbackInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 14,
  },
  feedbackTextArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  star: {
    padding: 5,
  },
  starText: {
    fontSize: 24,
    color: '#ddd',
  },
  starActive: {
    color: '#4A90E2',
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'top-center',
    marginTop: 50,
    marginBottom: 20,
  },
  aboutContent: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 20,
    textAlign: 'justify',
  },
  feedbackSection: {
      flexDirection: 'column',
      gap: 4
  },
});

