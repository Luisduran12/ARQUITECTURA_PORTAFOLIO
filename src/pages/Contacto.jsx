import {
  Text,
  Flex,
  FormControl,
  Input,
  Textarea,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { CONTACT_INFO } from "../utils/constants";

function Contacto() {
  const { t } = useTranslation();
  const toast = useToast();
  const actionURL = "https://formspree.io/f/mqazeoqy";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const formData = new FormData(form);

    try {
      const response = await fetch(actionURL, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        toast({
          title: t('contacto.alertaTitulo'),
          description: t('contacto.alertaDescripcion'),
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        form.reset();
      } else {
        throw new Error("Error en el envío del mensaje");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: t('contacto.alertaProblema'),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      backgroundImage="url('./RENDERS/SALA/s4.webp')"
      backgroundSize="cover"
      w="100%"
      h="100vh"
      pt="140px"
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        h="100%"
        px={{ base: "5", md: "10" }}
      >
        <Box
          maxW="700px"
          width="100%"
          p="6"
          bgColor="rgba(0, 0, 0, 0.4)"
          borderRadius="md"
          boxShadow="md"
          className="slide-in-left"
        >
          <Text
            fontSize={{ base: "14px", sm: "20px" }}
            fontWeight="bold"
            mb="8"
            textAlign="center"
            maxW="750px"
            color="white"
          >
            {t('contacto.parrafo')}
          </Text>
          <form onSubmit={handleSubmit}>
            <FormControl id="contact-form">
              <Flex direction={{ base: "column", sm: "row" }} mb="4">
                <FormControl flex="1" mr={{ base: "0", sm: "2" }}>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder={t('contacto.nombres')}
                    bg="#1e1d1d"
                    color="white"
                    required
                    boxShadow="md"
                    border="none"
                    _placeholder={{ color: "gray.500" }}
                  />
                </FormControl>
                <FormControl
                  flex="1"
                  ml={{ base: "0", sm: "2" }}
                  mt={{ base: "4", sm: "0" }}
                >
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder={t('contacto.apellidos')}
                    bg="#1e1d1d"
                    color="white"
                    required
                    boxShadow="md"
                    border="none"
                    _placeholder={{ color: "gray.500" }}
                  />
                </FormControl>
              </Flex>

              <FormControl mb="4">
                <Input
                  id="email"
                  name="_replyto"
                  type="email"
                  placeholder={t('contacto.correo')}
                  bg="#1e1d1d"
                  color="white"
                  required
                  boxShadow="md"
                  border="none"
                  _placeholder={{ color: "gray.500" }}
                />
              </FormControl>

              <FormControl mb="6">
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t('contacto.mensaje')}
                  bg="#1e1d1d"
                  color="white"
                  required
                  boxShadow="md"
                  border="none"
                  _placeholder={{ color: "gray.500" }}
                />
              </FormControl>

              <Flex
                direction={{ base: "column", sm: "row" }}
                alignItems="center"
              >
                <Box
                  p="2"
                  mr={{ base: "0", sm: "4" }}
                  mb={{ base: "2", sm: "0" }}
                  borderRadius="md"
                  bg="#1e1d1d"
                  boxShadow="md"
                  flex="1"
                >
                  <Text isTruncated whiteSpace="nowrap" color="white">
                    {CONTACT_INFO.email}
                  </Text>
                </Box>
                <Button
                  w="100%"
                  maxW="200px"
                  bg="blue.500"
                  color="white"
                  _hover={{ bg: "blue.600" }}
                  _active={{ bg: "blue.700" }}
                  type="submit"
                  rightIcon={<MdSend />}
                  boxShadow="md"
                  className="animate-top"
                >
                  {t('contacto.boton')}
                </Button>
              </Flex>
            </FormControl>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}

export default Contacto;
