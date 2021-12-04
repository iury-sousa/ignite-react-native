import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export const SkillCard = ({ skill }) => {
  return (
    <TouchableOpacity style={styles.buttonSkill} activeOpacity={0.8}>
      <Text style={styles.textSkill}>{skill}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonSkill: {
    backgroundColor: '#1F1E25',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 10,
  },
  textSkill: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
