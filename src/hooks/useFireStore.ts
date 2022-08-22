import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";

interface ICondition {
   fieldName: string;
   operator: any;
   compareValue: any;
}

const useFireStore = (collectionPath: string, condition: ICondition) => {
   const [docs, setDocs] = useState<any>([]);

   useEffect(() => {
      let collectionRef = db.collection(collectionPath).orderBy("createAt");

      if (condition) {
         if (!condition.compareValue || !condition.compareValue.length) return;

         collectionRef = collectionRef.where(
            condition.fieldName,
            condition.operator,
            condition.compareValue
         );
      }

      const unsubcribe = collectionRef.onSnapshot((snapshot) => {
         const documents = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
         }));

         setDocs(documents);
      });

      return unsubcribe;
   }, [collectionPath, condition]);

   return docs;
};

export default useFireStore;
