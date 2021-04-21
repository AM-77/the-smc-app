import { theme } from '../core/theme';
import { Text, StyleSheet } from 'react-native';

export default function HeaderBar(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});
