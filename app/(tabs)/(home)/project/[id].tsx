import { useLocalSearchParams } from 'expo-router';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function ProjectDetails() {
  const { id, title, author, description, image } = useLocalSearchParams();
  
  return (
    <View style={styles.container}>
      <Image source={image as any} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>{author}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 18,
    color: 'gray',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
});
