import { Image } from 'expo-image';
import { useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type Property = {
  id: string;
  title: string;
  price: number;
  location: string;
  imageUrl: string;
};

const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Apartment',
    price: 2500,
    location: 'Downtown',
    imageUrl: 'https://picsum.photos/200/300',
  },
  {
    id: '2',
    title: 'Modern House',
    price: 3500,
    location: 'Uptown',
    imageUrl: 'https://picsum.photos/200/301',
  },
  {
    id: '3',
    title: 'Cozy Studio',
    price: 1500,
    location: 'Midtown',
    imageUrl: 'https://picsum.photos/200/302',
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState<Property[]>(mockProperties);

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPropertyItem = ({ item }: { item: Property }) => (
    <ThemedView style={styles.propertyCard}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.propertyImage}
        contentFit="cover"
      />
      <ThemedView style={styles.propertyInfo}>
        <ThemedText type="subtitle">{item.title}</ThemedText>
        <ThemedText>${item.price}/month</ThemedText>
        <ThemedText>{item.location}</ThemedText>
      </ThemedView>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search properties..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
        />
      </View>
      <FlatList
        data={filteredProperties}
        renderItem={renderPropertyItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  propertyCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  propertyImage: {
    width: '100%',
    height: 200,
  },
  propertyInfo: {
    padding: 16,
    gap: 4,
  },
});
