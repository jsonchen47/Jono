import { useLocalSearchParams } from 'expo-router';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProjectDetails() {
  const { id, title, author, description, image, skills, resources } = useLocalSearchParams();
  
  return (
    <View style={styles.container}>
      <Image source={image as any} style={styles.image} />
      <View style={styles.textView}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.author}>
          {skills?.[0] || 'No skills listed'}
        </Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  image: {
    width: windowWidth,
    height: windowHeight/3,
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
  textView: {
    padding: windowWidth/20
  }
});
