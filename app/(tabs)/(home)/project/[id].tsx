import { useLocalSearchParams } from 'expo-router';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { Chip } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const color = ['red', '#66CCFF', '#FFCC00', '#1C9379', '#8A7BA7'];
const randomColor = () => {
  let col = color[Math.floor(Math.random() * color.length)];
  return col;
};

export default function ProjectDetails() {
  const { id, title, author, description, image, skills, resources } = useLocalSearchParams()

  const skillsArr = skills ? JSON.parse(skills as string) : [];
  const resourcesArr = resources ? JSON.parse(resources as string) : [];
  
  return (
    <View style={styles.container}>
      {/* Image */}
      <Image source={image as any} style={styles.image} />
      <View style={styles.textView}>
         {/* Title and author */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
        {/* Skills */}
        <Text style={styles.subTitle}>Skills </Text>
        {skillsArr.map((skill: string, index: number) => (
          <View style={{
            margin: 5,
            flexWrap: 'wrap',
            }}>
            <Chip 
              key={index}
              textStyle={{ color:'white',fontSize: 15 }}
              style={{ backgroundColor: randomColor() }} >
                {skill}</Chip>
          </View>
        ))}
        {/* Resources */}
        <Text style={styles.subTitle}>Resources </Text>
        {resourcesArr.map((resource: string, index: number) => (
          <View style={{
            margin: 5,
            flexWrap: 'wrap',
            }}>
            <Chip 
              key={index}
              textStyle={{ color:'white',fontSize: 15 }}
              style={{ backgroundColor: randomColor() }} >
                {resource}</Chip>
          </View>
        ))}
        {/* Description */}
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
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 15,
  }
});
