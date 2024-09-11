import { useLocalSearchParams } from 'expo-router';
import { View, Image, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';


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

    <ScrollView >
      {/* Image */}
      <Image source={image as any} style={styles.image} />
      <View style={styles.textView}>
         {/* Title and author */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
        {/* Skills */}
        <View style={styles.subtitleContainer}>
          {/* <Ionicons name={'extension-puzzle-outline'} size={32} style={styles.icon} /> */}
          <Icon name='atom' style={styles.icon}></Icon>
          <Text style={styles.subTitle}>Skills </Text>
        </View>
        <View style={styles.allChipsContainer}>
          {skillsArr.map((skill: string, index: number) => (
            <View style={styles.singleChipContainer}>
              <Chip 
                key={index}
                textStyle={{ color:'white',fontSize: 14 }}
                style={{ backgroundColor: randomColor() }} >
                  {skill}
              </Chip>
            </View>
          ))}
        </View>
        {/* Resources */}
        <View style={styles.subtitleContainer}>
          <Icon name='suitcase' style={styles.icon}></Icon>
          <Text style={styles.subTitle}>Resources </Text>
        </View>
        <View style={styles.allChipsContainer}>
          {resourcesArr.map((resource: string, index: number) => (
            <View style={styles.singleChipContainer}>
              <Chip 
                key={index}
                textStyle={{ color:'white',fontSize: 14 }}
                style={{ backgroundColor: randomColor() }} >
                  {resource}
              </Chip>
            </View>
          ))}
        </View>
        {/* Description */}
        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
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
    flex: 1,
    fontSize: 17,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
  },
  allChipsContainer: {
    margin: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  singleChipContainer: {
    padding: 5,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    display:"flex",
    fontSize: 17,
  },
  subtitleContainer: {
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  }
});
