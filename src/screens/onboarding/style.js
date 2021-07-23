import {ms, ScaledSheet} from 'react-native-size-matters';
import {Colors, Typography} from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default ScaledSheet.create({
  logo: {
    width: wp('50%'),
    height: hp('10%'),
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  abovekeyboardContainer: {
    padding: '20@ms',
    height: '100%',
  },
  socialBtnContainer: {
    padding: '20@ms',
  },
  bgcontainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  socialBtn: {
    width: wp('90%'),
    padding: '18@ms',
    paddingLeft: '70@ms',
    borderBottomWidth: 10,
    borderBottomColor: '#faf5ff',
  },
  socialBtnText: {
    ...Typography.FONT_BOLD,
    fontSize: '15@s',
    color: Colors.PRIMARY,
  },
  heading: {
    fontSize: '20@s',
    color: Colors.SECONDARY,
    alignSelf: 'center',
    marginTop: '19@s',
    marginBottom: '0@s',
    fontWeight: 'bold',
  },
  formContainer: {
    paddingBottom: '30@ms',
    paddingTop: '20@ms',
  },
  containerStyles: {
    marginBottom: '10@s',
    height: '60@ms',
  },
  error: {
    color: '#FF0000',
    fontSize: '12@ms',
    paddingBottom: '8@ms',
  },
  btn: {
    paddingVertical: 16,
    backgroundColor: 'black',
    borderRadius: '7@ms',
    alignItems: 'center',
    height: 55,
  },
  imgbackground: {
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
  },
  btnText: {
    fontSize: '15@s',
    color: '#f7fafc',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  CreateAccountBtn: {
    fontSize: '16@s',
    color: '#f7fafc',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 4,
  },
  loadingbtn: {
    marginTop: 5,
  },
  terms: {
    fontSize: '15@s',
    textAlign: 'center',
  },
  txt: {
    fontSize: '15@s',
    textAlign: 'center',
    borderRadius: '7@ms',
  },
  altText: {
    paddingTop: '15@ms',
  },
  radioBtnContainer: {
    paddingTop: '15@ms',
  },
  radioBtn: {
    width: wp('44%'),
    padding: '8@ms',
    marginTop: '8@ms',
  },
  icon: {
    alignSelf: 'center',
    marginTop: '-10@ms',
  },
  modalContent: {
    backgroundColor: 'white',
    width: wp('95%'),
    alignSelf: 'center',
    borderRadius: '7@ms',
    padding: '15@ms',
    flex: 1,
    paddingTop: 50,
  },
  modalContainer: {
    padding: '10@ms',
  },
});
